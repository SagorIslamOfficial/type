import { Button } from "@/components/ui/button";
import { GameMode } from "@/types/game";

interface GameModeSelectorProps {
	currentMode: GameMode;
	onModeSelect: (mode: GameMode) => void;
}

export function GameModeSelector({ currentMode, onModeSelect }: GameModeSelectorProps) {
	const modes: { id: GameMode; label: string }[] = [
		{ id: "standard", label: "Standard" },
		{ id: "burst", label: "Word Burst" },
		{ id: "racing", label: "Racing Challenge" },
		{ id: "sprint", label: "Moving Sprint" },
	];

	return (
		<div className="flex gap-4 mb-6">
			{modes.map((mode) => (
				<Button key={mode.id} variant={currentMode === mode.id ? "default" : "outline"} onClick={() => onModeSelect(mode.id)}>
					{mode.label}
				</Button>
			))}
		</div>
	);
}
