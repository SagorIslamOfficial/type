import { useState, useCallback } from "react";
import { useTypingTest } from "@/hooks/useTypingTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Settings, Timer } from "lucide-react";
import ResultsModal from "./ResultsModal";
import SettingsModal from "./SettingsModal";
import { TestSettings, GameMode } from "@/types";
import { GameModeSelector } from "./GameModeSelector";
import { RacingMode } from "./modes/RacingMode";
import { SprintMode } from "./modes/SprintMode";
import { WordBurstMode } from "./modes/WordBurstMode";
import { cn } from "@/lib/utils";
import { getRandomText } from "@/lib/texts";

export default function TestContainer() {
	const [settings, setSettings] = useState<TestSettings>({
		duration: 60,
		difficulty: "medium",
		theme: "literature",
		mode: "timed",
	});
	const [showSettings, setShowSettings] = useState(false);
	const [gameMode, setGameMode] = useState<GameMode>("standard");
	const [newText, setNewText] = useState<string>(getRandomText(settings.theme, settings.difficulty));

	const { text, input, isActive, timeLeft, mistakes, result, startTest, handleInput, calculateWPM, calculateAccuracy, resetTest } = useTypingTest({ ...settings, text: newText });

	const resetGame = useCallback(() => {
		setNewText(getRandomText(settings.theme, settings.difficulty));
		resetTest();
	}, [resetTest, settings.theme, settings.difficulty]);

	const renderGameMode = () => {
		switch (gameMode) {
			case "racing":
				return <RacingMode settings={settings} />;
			case "sprint":
				return <SprintMode settings={settings} />;
			case "burst":
				return <WordBurstMode settings={settings} />;
			default:
				return (
					<Card className="p-8">
						<div className="flex justify-between items-center mb-4">
							<div className="flex items-center gap-4">
								<Timer className="w-5 h-5" />
								<span className="text-xl font-mono font-bold capitalize">{settings.mode === "timed" ? `${timeLeft}s` : settings.mode}</span>
							</div>
							<div className="flex gap-4">
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
						</div>

						<Progress value={(timeLeft / settings.duration) * 100} className="mb-4" />

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
							ref={(ref) => {
								if (ref) {
									ref.focus();
								}
							}}
							className={cn("w-full p-4 bg-background border-2 rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-0 focus:ring-blue-500", isActive && "border-blue-500")}
							value={input}
							onChange={(e) => handleInput(e.target.value)}
							disabled={!isActive || timeLeft === 0}
							placeholder={isActive ? "Start typing..." : "Click 'Start Test' to begin"}
							autoFocus
						/>

						<div className="mt-4 flex justify-between">
							<div></div>
							<Button className="rounded-sm text-lg px-5 py-5" onClick={startTest} disabled={isActive}>
								Start Test
							</Button>
							<Button className="rounded-sm text-lg px-5 py-5" onClick={resetGame} disabled={!isActive}>
								Reset
							</Button>
						</div>
					</Card>
				);
		}
	};

	return (
		<div className="w-[1200px] mx-auto p-6 space-y-6">
			<div className="flex justify-between">
				<GameModeSelector currentMode={gameMode} onModeSelect={setGameMode} />
				<Button variant="outline" onClick={() => setShowSettings(true)}>
					<Settings className="w-4 h-4 mr-2" />
					Settings
				</Button>
			</div>

			{renderGameMode()}

			<ResultsModal
				result={result}
				onClose={() => {
					resetGame();
				}}
				open={result !== null}
			/>

			<SettingsModal
				settings={settings}
				onSave={(newSettings) => {
					setSettings(newSettings);
					setShowSettings(false);
					setNewText(getRandomText(newSettings.theme, newSettings.difficulty)); // Update text when settings change
				}}
				open={showSettings}
				onClose={() => setShowSettings(false)}
			/>
		</div>
	);
}
