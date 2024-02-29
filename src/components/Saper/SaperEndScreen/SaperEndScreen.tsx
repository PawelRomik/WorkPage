import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { css } from "@emotion/react";
import "./SaperEndScreen.style.scss";

type SaperEndScreenProps = {
	bestTimes: number[];
	gameOver: boolean;
	victory: boolean;
	difficulty: number;
	playAgain: () => void;
	firstClick: boolean;
	changeDifficultyOnClick: (passedDifficulty: number) => void;
};

const SaperEndScreen = ({ bestTimes, gameOver, victory, difficulty, playAgain, changeDifficultyOnClick, firstClick }: SaperEndScreenProps) => {
	const { color } = useSettingsContext();

	const resetButtonStyles = useMemo(
		() => css`
			&:not([disabled]):hover,
			&:not([disabled]):focus {
				background-color: ${color} !important;
				color: white !important;
			}
		`,
		[color]
	);

	const gameOverText = useMemo(() => (gameOver ? (victory ? "You won!" : "Game Over!") : ""), [gameOver, victory]);
	const gameOverButtonText = useMemo(() => (gameOver ? "Play again" : "Reset"), [gameOver]);

	return (
		<div className='saperEndScreen'>
			<p className='game-over'>{gameOverText}</p>
			<div className='saperStats'>
				<p>Stats: </p>
				<p className='saperStatsParagraph'>Easy: {bestTimes[0] ? bestTimes[0] + "s" : "-"}</p>
				<p className='saperStatsParagraph'>Normal: {bestTimes[1] ? bestTimes[1] + "s" : "-"}</p>
				<p className='saperStatsParagraph'>Hard: {bestTimes[2] ? bestTimes[2] + "s" : "-"}</p>
			</div>
			<div className='saperRightButtons'>
				<div className='saperDifficulty'>
					<button onClick={() => changeDifficultyOnClick(0)} className={`saperDifficultyButton saperEasy ${difficulty === 0 && "saperDifficultyActive"}`}>
						Easy
					</button>
					<button onClick={() => changeDifficultyOnClick(1)} className={`saperDifficultyButton saperNormal ${difficulty === 1 && "saperDifficultyActive"}`}>
						Normal
					</button>
					<button onClick={() => changeDifficultyOnClick(2)} className={`saperDifficultyButton saperHard ${difficulty === 2 && "saperDifficultyActive"}`}>
						Hard
					</button>
				</div>
				<button className='saperButton' disabled={firstClick} css={resetButtonStyles} onClick={playAgain}>
					{gameOverButtonText}
				</button>
			</div>
		</div>
	);
};

export default SaperEndScreen;
