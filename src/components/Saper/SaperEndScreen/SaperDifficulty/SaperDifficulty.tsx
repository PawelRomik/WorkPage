import { useTranslation } from "react-i18next";
import { saperDifficultyStyles } from "./SaperDifficulty.styles";
import { useSettingsContext } from "../../../../providers/SettingsContext";

type SaperDifficultyProps = {
	difficulty: number;
	changeDifficultyOnClick: (newValue: number) => void;
};

export const SaperDifficulty = ({ difficulty, changeDifficultyOnClick }: SaperDifficultyProps) => {
	const { t } = useTranslation();
	const { darkMode } = useSettingsContext();

	return (
		<div className='saperDifficulty' css={saperDifficultyStyles(darkMode)}>
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
	);
};
