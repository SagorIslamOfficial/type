import { useState, useEffect, useCallback } from "react";
import { useTypingTest } from "@/hooks/useTypingTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaCarSide } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getRandomText } from "@/lib/texts";
import { TestSettings } from "@/types";

const TRACK_LENGTH = 100;

export function RacingMode({ settings }: { settings: TestSettings }) {
	const [playerName, setPlayerName] = useState("Player");
	const [speedMultiplier, setSpeedMultiplier] = useState(1);
	const [competitors, setCompetitors] = useState([
		{ name: "Alice", position: 0, wpm: 0, icon: FaCarSide },
		{ name: "Bob", position: 0, wpm: 0, icon: FaCarSide },
		{ name: "Charlie", position: 0, wpm: 0, icon: FaCarSide },
	]);
	const [newText, setNewText] = useState<string>(getRandomText(settings.theme, settings.difficulty));

	const { text, input, isActive, timeLeft, mistakes, startTest, handleInput, calculateWPM, calculateAccuracy, resetTest, inputRef } = useTypingTest({ ...settings, text: newText });
	const [playerPosition, setPlayerPosition] = useState(0);

	const resetGame = useCallback(() => {
		setNewText(getRandomText(settings.theme, settings.difficulty));
		resetTest();
		setPlayerPosition(0); // Reset player position
		setCompetitors([
			// Reset competitors' positions
			{ name: "Alice", position: 0, wpm: 0, icon: FaCarSide },
			{ name: "Bob", position: 0, wpm: 0, icon: FaCarSide },
			{ name: "Charlie", position: 0, wpm: 0, icon: FaCarSide },
		]);
	}, [resetTest, settings.theme, settings.difficulty]);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (isActive) {
			interval = setInterval(() => {
				const competitorUpdates = competitors.map((comp) => ({
					...comp,
					position: Math.min(TRACK_LENGTH, comp.position + speedMultiplier * 0.1), // Adjust speed as needed
					wpm: Math.floor(Math.random() * 5) + 10, // Simulate random WPM
				}));
				setCompetitors(competitorUpdates);
				setPlayerPosition(Math.min(TRACK_LENGTH, (input.length / text.length) * TRACK_LENGTH));
			}, 100);

			return () => {
				if (interval) {
					clearInterval(interval);
				}
			};
		}
	}, [isActive, input.length, text.length, speedMultiplier, competitors]);

	return (
		<Card className="p-6">
			<div className="mb-4 flex justify-between items-center">
				<div className="flex items-center">
					<span className="mr-2 font-bold">Your Name:</span>
					<Input placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-[180px] h-10" />
				</div>

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

				<Select value={String(speedMultiplier)} onValueChange={(value) => setSpeedMultiplier(Number(value))}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Speed Multiplier" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Normal Speed (1x)</SelectItem>
						<SelectItem value="2">Fast (2x)</SelectItem>
						<SelectItem value="3">Super Fast (3x)</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-4 mt-8 mb-8">
				<div className="flex items-center gap-4">
					<span className="w-32 font-bold text-gray-900">{playerName}</span>
					<div className="relative w-full">
						{/* Wrap the progress bar and icon in a relative div */}
						<Progress value={playerPosition} className="h-3" />
						{playerPosition > 0 && <MdEmojiPeople className="absolute top-1/2 -translate-y-1/2 text-yellow-600 h-5 w-5" style={{ left: `${(playerPosition / TRACK_LENGTH) * 100}%` }} />}
					</div>
					<span className="w-32 text-right font-bold text-gray-900">{calculateWPM()} WPM</span>
				</div>
				{competitors.map((comp) => (
					<div key={comp.name} className="flex items-center gap-4">
						<span className="w-32">{comp.name}</span>
						<div className="relative w-full">
							<Progress value={comp.position} className="h-3" />
							{comp.position > 0 && <comp.icon className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(comp.position / TRACK_LENGTH) * 100}%` }} />}
						</div>
						<span className="w-32 text-right">{comp.wpm} WPM</span>
					</div>
				))}
			</div>

			<div className="min-h-[100px] mb-4 p-4 bg-muted rounded-lg font-mono text-lg">
				{text.split("").map((char, index) => {
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

			<textarea
				ref={inputRef}
				className={cn("w-full p-4 bg-background border-2 rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-0 focus:ring-blue-500", isActive && "border-blue-500")}
				value={input}
				onChange={(e) => handleInput(e.target.value)}
				disabled={!isActive} // Corrected: Only disable when !isActive
				placeholder={isActive ? "Start typing..." : "Click 'Start Race' to begin"}
			/>

			<div className="mt-4 flex justify-between">
				<div></div>
				<Button className="rounded-sm text-lg px-5 py-5" onClick={startTest} disabled={isActive}>
					Start Race
				</Button>

				<Button className="rounded-sm text-lg px-5 py-5" onClick={resetGame} disabled={!isActive}>
					Reset Race
				</Button>
			</div>
		</Card>
	);
}
