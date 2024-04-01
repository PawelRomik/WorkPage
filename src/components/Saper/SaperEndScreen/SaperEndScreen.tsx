import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SaperDifficulty from "./SaperDifficulty/SaperDifficulty";
import SaperStats from "./SaperStats/SaperStats";
import { saperEndScreenStyles } from "./SaperEndScreen.styles";

type SaperEndScreenProps = {
	bestTimes: number[];
	gameOver: boolean;
	difficulty: number;
	playAgain: () => void;
	firstClick: boolean;
	changeDifficultyOnClick: (passedDifficulty: number) => void;
};

const SaperEndScreen = ({ bestTimes, gameOver, difficulty, playAgain, changeDifficultyOnClick, firstClick }: SaperEndScreenProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	const gameOverButtonText = useMemo(() => (gameOver ? t("Minesweeper.minesweeperButtonPlayAgain") : t("Minesweeper.minesweeperButtonReset")), [gameOver, t]);

	return (
		<div className='saperEndScreen' css={saperEndScreenStyles(darkMode, color)}>
			<SaperStats bestTimes={bestTimes} />
			<div className='saperRightButtons'>
				<SaperDifficulty difficulty={difficulty} changeDifficultyOnClick={changeDifficultyOnClick} />
				<button className='saperButton' disabled={firstClick} onClick={playAgain}>
					{gameOverButtonText}
				</button>
			</div>
		</div>
	);
};

export default SaperEndScreen;
