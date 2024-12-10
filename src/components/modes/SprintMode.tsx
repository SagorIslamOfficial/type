import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestSettings } from "@/types";
import { useTypingTest } from "@/hooks/useTypingTest";
import { cn } from "@/lib/utils";
import { getRandomText } from "@/lib/texts"; // Import getRandomText

interface SprintModeProps {
	settings: TestSettings;
}

export function SprintMode({ settings }: SprintModeProps) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [speedMultiplier, setSpeedMultiplier] = useState(1);
	const [autoScroll, setAutoScroll] = useState(true);
	const [sprintText, setSprintText] = useState(""); // State for Sprint text
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const { input, isActive, timeLeft, mistakes, startTest, handleInput, calculateWPM, calculateAccuracy, resetTest, inputRef } = useTypingTest({ ...settings, text: sprintText });

	// Generate new text when the component mounts or settings change
	useEffect(() => {
		generateNewText();
	}, [settings.theme, settings.difficulty]);

	const generateNewText = useCallback(() => {
		setSprintText(getRandomText(settings.theme, settings.difficulty));
	}, [settings.theme, settings.difficulty]);

	// Calculate scroll position based on input length
	const calculateScrollPosition = useCallback(() => {
		if (!textRef.current) return 0;
		const charWidth = 10; // Approximate width of each character
		return Math.max(0, input.length * charWidth);
	}, [input.length, textRef]);

	// Handle auto-scrolling
	useEffect(() => {
		if (isActive && timeLeft > 0 && autoScroll) {
			const baseSpeed = settings.difficulty === "easy" ? 1 : settings.difficulty === "medium" ? 2 : 5;
			const scrollSpeed = baseSpeed * speedMultiplier;

			const interval = setInterval(() => {
				setScrollPosition((prev) => prev + scrollSpeed);
			}, 50);

			return () => clearInterval(interval);
		}
	}, [isActive, settings.difficulty, speedMultiplier, timeLeft, autoScroll]);

	// Handle typing-based scrolling
	useEffect(() => {
		if (isActive && !autoScroll) {
			setScrollPosition(calculateScrollPosition());
		}
	}, [input.length, isActive, autoScroll, calculateScrollPosition]);

	const resetSprint = () => {
		resetTest();
		setScrollPosition(0);
		generateNewText(); // Generate new text on reset
	};

	useEffect(() => {
		if (isActive) {
			inputRef.current?.focus();
		}
	}, [isActive, inputRef]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			handleInput(e.target.value);
			if (!autoScroll) {
				setScrollPosition(calculateScrollPosition());
			}
		},
		[handleInput, autoScroll, calculateScrollPosition]
	); // Added dependencies

	return (
		<Card className="p-6">
			<div className="mb-4 flex justify-between items-center">
				<div className="flex gap-4">
					<span className="text-lg font-mono font-bold capitalize">Time: {settings.mode === "timed" ? `${timeLeft}s` : settings.mode}</span>
					<span>
						Mistakes: <span className="font-bold text-lg">{mistakes}</span>
					</span>
					<div>
						WPM: <span className="font-bold text-lg">{calculateWPM()}</span>
					</div>
					<div>
						Accuracy: <span className="font-bold text-lg">{calculateAccuracy()}</span>%
					</div>
				</div>
				<div className="flex items-center gap-4">
					<span className="font-semibold">Select Scroll Type: </span>
					<Select value={autoScroll ? "Auto-scroll" : "Type-scroll"} onValueChange={(value) => setAutoScroll(value === "Auto-scroll")}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Choose Scroll Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Auto-scroll">Auto-scroll</SelectItem>
							<SelectItem value="Type-scroll">Type-scroll</SelectItem>
						</SelectContent>
					</Select>
					{autoScroll && ( // Keep the speed selector if autoScroll is true
						<Select value={String(speedMultiplier)} onValueChange={(value) => setSpeedMultiplier(Number(value))}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Scroll Speed" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Normal Speed (1x)</SelectItem>
								<SelectItem value="2">Fast (2x)</SelectItem>
								<SelectItem value="3">Super Fast (3x)</SelectItem>
							</SelectContent>
						</Select>
					)}
				</div>
			</div>

			<div ref={containerRef} className="relative h-[150px] mb-4 overflow-hidden bg-muted rounded-lg">
				<div ref={textRef} className="pl-[384px] pt-[60px] absolute w-full transition-transform duration-50 whitespace-nowrap p-4 font-mono text-lg" style={{ transform: `translateX(${-scrollPosition}px)` }}>
					{sprintText.split("").map((char, index) => {
						const inputChar = input[index];
						const isCorrect = inputChar === char;
						const isCurrent = index === input.length;

						return (
							<span key={index} className={`${inputChar === undefined ? "text-muted-foreground" : isCorrect ? "text-green-500" : "text-red-500 bg-red-100"} ${isCurrent ? "border-b-2 border-primary" : ""}`}>
								{char}
							</span>
						);
					})}
				</div>
			</div>

			<textarea
				ref={inputRef}
				className={cn("w-full p-4 bg-background border-2 rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-0 focus:ring-blue-500", isActive && "border-blue-500")}
				value={input}
				onChange={handleInputChange}
				disabled={!isActive}
				placeholder={isActive ? "Start typing..." : "Click 'Start Sprint' to begin"}
			/>

			<div className="mt-4 flex justify-between">
				<div></div>
				<Button className="rounded-sm text-lg px-5 py-5" onClick={startTest} disabled={isActive}>
					Start Sprint
				</Button>
				<Button className="rounded-sm text-lg px-5 py-5" onClick={resetSprint} disabled={!isActive}>
					Reset Sprint
				</Button>
			</div>
		</Card>
	);
}