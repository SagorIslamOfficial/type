import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TestSettings } from "@/types";
import { getRandomText } from "@/lib/texts";
import { cn } from "@/lib/utils";

interface FallingWord {
	id: string;
	word: string;
	top: number;
	left: number;
	speed: number;
	width: number;
}

interface WordBurstModeProps {
	settings: TestSettings;
}

export function WordBurstMode({ settings }: WordBurstModeProps) {
	const [score, setScore] = useState(0);
	const [combo, setCombo] = useState(0);
	const [currentInput, setCurrentInput] = useState("");
	const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
	const [isActive, setIsActive] = useState(false);
	const [explosions, setExplosions] = useState<{ id: string; left: number; top: number }[]>([]);
	const [missedWords, setMissedWords] = useState(0); // Added missedWords state

	const inputRef = useRef<HTMLInputElement>(null);
	const wordContainerRef = useRef<HTMLDivElement>(null);

	const addWord = useCallback(() => {
		const text = getRandomText(settings.theme, settings.difficulty);
		const words = text.split(" ");
		const word = words[Math.floor(Math.random() * words.length)];

		const tempSpan = document.createElement("span");
		tempSpan.textContent = word;
		tempSpan.style.font = "inherit";
		document.body.appendChild(tempSpan);
		const wordWidth = tempSpan.offsetWidth;
		document.body.removeChild(tempSpan);

		// Calculate maxLeft considering word width and container width
		const maxLeft = wordContainerRef.current ? wordContainerRef.current.offsetWidth - wordWidth : 0;
		const left = Math.random() * Math.max(0, maxLeft);

		const newWord: FallingWord = {
			id: Math.random().toString(),
			word,
			top: 0,
			left,
			speed: settings.difficulty === "easy" ? 1 : settings.difficulty === "medium" ? 2 : 3,
			width: wordWidth,
		};

		setFallingWords((prev) => [...prev, newWord]);
	}, [settings.difficulty, settings.theme]);

	// useCallback to prevent unnecessary re-renders of startGame
	const startGame = useCallback(() => {
		setIsActive(true);
		setScore(0);
		setCombo(0);
		setFallingWords([]);
		setCurrentInput("");

		// Use setTimeout to ensure the input is rendered before focusing
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus({ preventScroll: true }); // preventScroll prevents page scrolling
			}
		}, 100); // Increased delay for better reliability
	}, []);

	// const stopGame = () => {
	//   setIsActive(false);
	// };

	const resetGame = () => {
		setScore(0);
		setCombo(0);
		setFallingWords([]);
		setCurrentInput("");
		setIsActive(false);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCurrentInput(value);

		const matchedWord = fallingWords.find((w) => w.word === value);
		if (matchedWord) {
			setExplosions((prev) => [...prev, { id: Math.random().toString(), left: matchedWord.left, top: matchedWord.top }]);

			setScore((prev) => prev + value.length * (combo + 1));
			setCombo((prev) => prev + 1);
			setFallingWords((prev) => prev.filter((w) => w.id !== matchedWord.id));
			setCurrentInput("");
		}
	};

	useEffect(() => {
		if (!isActive) return;

		const wordInterval = setInterval(addWord, 2000);
		const fallInterval = setInterval(() => {
			setFallingWords((prev) => {
				const updated = prev.map((word) => ({
					...word,
					top: word.top + word.speed,
				}));
				const missed = updated.filter((word) => word.top >= window.innerHeight - 100); // Find missed words
				setMissedWords((prevMissed) => prevMissed + missed.length); // Increment missedWords
				return updated.filter((word) => word.top < window.innerHeight - 100);
			});
		}, 50);

		return () => {
			clearInterval(wordInterval);
			clearInterval(fallInterval);
		};
	}, [isActive, addWord, settings.difficulty]);

	useEffect(() => {
		if (explosions.length > 0) {
			const timer = setTimeout(() => {
				setExplosions([]);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [explosions]);

	return (
		<Card className="p-6">
			<div className="mb-4 flex justify-between items-center">
				<div className="text-xl">
					Score: <span className="font-bold">{score}</span>
				</div>
				<div className="text-xl">
					Missed Words: <span className="font-bold">{missedWords}</span>
				</div>
				<div className="text-xl">
					Combo: <span className="font-bold">{combo}</span>x
				</div>
			</div>

			<div className="relative h-[400px] mb-4 bg-muted rounded-lg overflow-hidden" ref={wordContainerRef}>
				{!isActive ? ( // Conditional rendering
					<div className="flex justify-center items-center h-full">
						<span className="text-orange-600 text-2xl">Click 'Start Game' to begin</span>
					</div>
				) : (
					<>
						{" "}
						{/* Render falling words and explosions only if the game is active */}
						{fallingWords.map((word) => (
							<div key={word.id} className="absolute transition-all duration-50 font-mono" style={{ top: `${word.top}px`, left: `${word.left}px` }}>
								{word.word}
							</div>
						))}
						{explosions.map((explosion) => (
							<div key={explosion.id} className="absolute w-16 h-16 animate-ping bg-yellow-400 rounded-full opacity-75" style={{ top: `${explosion.top}px`, left: `${explosion.left}px` }} />
						))}
					</>
				)}
			</div>

			<Input
				ref={inputRef} // Assign the ref to the Input component
				className={cn("w-full p-4 bg-background border-2 rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-0 focus:ring-blue-500", isActive && "border-blue-500")}
				value={currentInput}
				onChange={handleInput}
				disabled={!isActive}
				placeholder={isActive ? "Type the falling words..." : "Click 'Start Game' to begin"}
			/>

			<div className="mt-4 flex justify-between gap-4">
				<div></div>
				<Button className="rounded-sm text-lg px-5 py-5" onClick={startGame} disabled={isActive}>
					Start Game
				</Button>

				<Button className="rounded-sm text-lg px-5 py-5" onClick={resetGame} disabled={!isActive}>
					Reset
				</Button>
			</div>
		</Card>
	);
}
