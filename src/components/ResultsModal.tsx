import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestResult } from "@/types";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

interface ResultsModalProps {
	result: TestResult | null;
	onClose: () => void;
	open: boolean;
}

export default function ResultsModal({ result, onClose, open }: ResultsModalProps) {
	if (!result) return null;

	// Score categorization thresholds (adjust these as needed)
	const scoreThresholds = {
		low: 20,
		average: 40,
		good: 60,
		outstanding: Infinity,
	};

	// Determine score level
	let scoreLevel = "low";
	if (result.wpm >= scoreThresholds.average) scoreLevel = "average";
	if (result.wpm >= scoreThresholds.good) scoreLevel = "good";
	if (result.wpm >= scoreThresholds.outstanding) scoreLevel = "outstanding";

	// SVG image path based on score level
	const svgImagePath = `/assets/${scoreLevel}.svg`;

	const websiteUrl = "https://typing-speed-test-game.pages.dev";
	const hashtags = "#typingtest #speedtyping #typinggame";
	const twitterHandle = "parvezvai";

	const twitterMessage = `I scored ${result.wpm} WPM with ${result.accuracy}% accuracy! ${hashtags} @${twitterHandle} `;
	const linkedinMessage = `I scored ${result.wpm} WPM with ${result.accuracy}% accuracy! ${hashtags} `;
	const facebookMessage = `I scored ${result.wpm} WPM with ${result.accuracy}% accuracy! ${hashtags} `;

	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent className="p-0 gap-0 border-2 min-w-[600px] focus:outline-none">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>

				<div className="flex pt-12 pb-4 gap-2 px-6 bg-gray-100">
					<div className="w-2/5 items-center flex">
						<img src={svgImagePath} alt={`${scoreLevel} performance`} className="w-[170px]" />
					</div>
					<div className="w-3/5 items-start">
						<h2 className="text-3xl font-black">You're an {scoreLevel} typer!</h2>
						<p className="mb-4 mt-4">
							You typed with the speed of <span style={{ backgroundColor: "yellow", padding: "2px 4px", borderRadius: "4px", color: "black", fontWeight: "semibold", fontSize: "1.1em" }}>{result.wpm} WPM</span> and your accuracy is{" "}
							<span style={{ color: "black", fontWeight: "bold", fontSize: "1.1em" }}>{result.accuracy}%</span>. Congratulations!
						</p>
						<p className="font-semibold text-sm pb-2">Share your score</p>

						<div className="flex gap-3">
							<FacebookShareButton style={{ outline: "none", boxShadow: "none" }} url={websiteUrl} title={facebookMessage}>
								<FacebookIcon size={45} round />
							</FacebookShareButton>
							<TwitterShareButton style={{ outline: "none", boxShadow: "none" }} url={websiteUrl} title={twitterMessage}>
								<TwitterIcon size={45} round />
							</TwitterShareButton>
							<LinkedinShareButton style={{ outline: "none", boxShadow: "none" }} url={websiteUrl} title={linkedinMessage}>
								<LinkedinIcon size={45} round />
							</LinkedinShareButton>
						</div>
					</div>
				</div>

				<div className="text-center py-8">
					{/* <p className="font-semibold text-sm mb-5">
						Save your results{" "}
						<a className="text-blue-600" href="#">
							leadboard
						</a>
					</p> */}
					<Button className="px-6 py-6 bg-white hover:bg-gray-100 border-gray-900 text-black border-2" onClick={onClose}>
						Try Again
					</Button>
					{/* <Button className="px-6 ml-6 py-6 bg-blue-600 border-blue-600 border-2 hover:bg-blue-700" onClick={onClose}>
						Save
					</Button> */}
				</div>
			</DialogContent>
		</Dialog>
	);
}
