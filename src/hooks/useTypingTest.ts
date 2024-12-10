import { useState, useEffect, useCallback, useRef } from "react";
import { TestSettings, TestResult } from "@/types";

export const useTypingTest = ({ text, ...settings }: { text: string } & TestSettings) => {
	const [input, setInput] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [timeLeft, setTimeLeft] = useState(settings.mode === 'timed' ? settings.duration : 0);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [mistakes, setMistakes] = useState(0);
	const [result, setResult] = useState<TestResult | null>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null); // Add useRef for textarea

	const calculateWPM = useCallback(() => {
		if (!startTime || input.trim().length === 0) return 0;
		const timeElapsed = (Date.now() - startTime) / 1000 / 60;
		const wordsTyped = input.trim().split(" ").length;
		return Math.round(wordsTyped / timeElapsed);
	}, [input, startTime]);

	const calculateAccuracy = useCallback(() => {
		if (input.length === 0) return 100;
		const correctChars = input.split('').filter((char, index) => char === text[index]).length;
		return Math.round((correctChars / input.length) * 100);
	}, [input, text]);

	const startTest = useCallback(() => {
		setIsActive(true);
		setStartTime(Date.now());
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0); // Use setTimeout to ensure element is rendered
	}, []);

	const resetTest = useCallback(() => {
		setInput("");
		setMistakes(0);
		setTimeLeft(settings.mode === 'timed' ? settings.duration : 0);
		setIsActive(false);
		setResult(null);
		// inputRef.current?.value = ""; // Clear textarea value
	}, [settings]);

	const endTest = useCallback(() => {
		setIsActive(false);
		const result: TestResult = {
			wpm: calculateWPM(),
			accuracy: calculateAccuracy(),
			charactersTyped: input.length,
			mistakes,
			timeTaken: settings.mode === 'timed' ? settings.duration - timeLeft : 0,
			timestamp: Date.now(),
		};
		setResult(result);
	}, [calculateWPM, calculateAccuracy, input.length, mistakes, settings.duration, timeLeft]);

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		if (isActive && settings.mode === 'timed') {
			timer = setInterval(() => {
				if (timeLeft > 0) {
					setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
				} else {
					endTest();
				}
			}, 1000);
		}
		return () => clearInterval(timer!);
	}, [isActive, timeLeft, endTest, settings.mode]);

	const handleInput = useCallback((value: string) => {
		if (!isActive) return; // Prevent input when inactive
		if (!startTime) setStartTime(Date.now());

		const newMistakes = [...value].reduce((count, char, i) => {
			return count + (char !== text[i] ? 1 : 0);
		}, 0);

		setMistakes(newMistakes);
		setInput(value);

		if (settings.mode === 'timed') {
			const currentTimeLeft = startTime ? settings.duration - Math.floor((Date.now() - startTime) / 1000) : settings.duration;
			setTimeLeft(currentTimeLeft);
		}

		if (value.length === text.length) {
			endTest();
		}
	}, [isActive, startTime, text, settings.mode]);

	return {
		text,
		input,
		isActive,
		timeLeft,
		mistakes,
		result,
		startTest,
		resetTest,
		handleInput,
		calculateWPM,
		calculateAccuracy,
		inputRef, // Pass inputRef to TestContainer
	};
};