import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { css } from "@emotion/react";
import "./SaperEndScreen.style.scss";
import { useTranslation } from "react-i18next";

type SaperEndScreenProps = {
	bestTimes: number[];
	gameOver: boolean;
	difficulty: number;
	playAgain: () => void;
	firstClick: boolean;
	changeDifficultyOnClick: (passedDifficulty: number) => void;
};

const SaperEndScreen = ({ bestTimes, gameOver, difficulty, playAgain, changeDifficultyOnClick, firstClick }: SaperEndScreenProps) => {
	const { color } = useSettingsContext();
	const { t } = useTranslation();

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

	const gameOverButtonText = useMemo(() => (gameOver ? t("Minesweeper.minesweeperButtonPlayAgain") : t("Minesweeper.minesweeperButtonReset")), [gameOver, t]);

	return (
		<div className='saperEndScreen'>
			<div className='saperStats'>
				<p>{t("Minesweeper.minesweeperStats")}: </p>
				<p className='saperStatsParagraph'>
					{t("Minesweeper.minesweeperEasy")}: {bestTimes[0] ? bestTimes[0] + "s" : "-"}
				</p>
				<p className='saperStatsParagraph'>
					{t("Minesweeper.minesweeperNormal")}: {bestTimes[1] ? bestTimes[1] + "s" : "-"}
				</p>
				<p className='saperStatsParagraph'>
					{t("Minesweeper.minesweeperHard")}: {bestTimes[2] ? bestTimes[2] + "s" : "-"}
				</p>
			</div>
			<div className='saperRightButtons'>
				<div className='saperDifficulty'>
					<button onClick={() => changeDifficultyOnClick(0)} className={`saperDifficultyButton saperEasy ${difficulty === 0 && "saperDifficultyActive"}`}>
						{t("Minesweeper.minesweeperEasy")}
					</button>
					<button onClick={() => changeDifficultyOnClick(1)} className={`saperDifficultyButton saperNormal ${difficulty === 1 && "saperDifficultyActive"}`}>
						{t("Minesweeper.minesweeperNormal")}
					</button>
					<button onClick={() => changeDifficultyOnClick(2)} className={`saperDifficultyButton saperHard ${difficulty === 2 && "saperDifficultyActive"}`}>
						{t("Minesweeper.minesweeperHard")}
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
