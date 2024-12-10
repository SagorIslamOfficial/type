import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TestSettings, Theme, Difficulty, TestMode } from '@/types';

interface SettingsModalProps {
	settings: TestSettings;
	onSave: (settings: TestSettings) => void;
	open: boolean;
	onClose: () => void;
}

export default function SettingsModal({
	settings,
	onSave,
	open,
	onClose,
}: SettingsModalProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const newSettings: TestSettings = {
			duration: parseInt(formData.get('duration') as string),
			difficulty: formData.get('difficulty') as Difficulty,
			theme: formData.get('theme') as Theme,
			mode: formData.get('mode') as TestMode,
		};
		onSave(newSettings);
	};

	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent className="w-md">
				<DialogHeader>
					<DialogTitle>Test Settings</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="duration">Duration (seconds)</Label>
						<Input
							id="duration"
							name="duration"
							type="number"
							defaultValue={settings.duration}
							min={15}
							max={300}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="difficulty">Difficulty</Label>
						<Select name="difficulty" defaultValue={settings.difficulty}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="easy">Easy</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="hard">Hard</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="theme">Theme</Label>
						<Select name="theme" defaultValue={settings.theme}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="programming">Programming</SelectItem>
								<SelectItem value="literature">Literature</SelectItem>
								<SelectItem value="quotes">Quotes</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="mode">Mode</Label>
						<Select name="mode" defaultValue={settings.mode}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="practice">Practice</SelectItem>
								<SelectItem value="timed">Timed</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Save Changes</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}