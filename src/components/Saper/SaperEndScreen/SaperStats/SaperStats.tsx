import { useTranslation } from "react-i18next";
import { saperStatsStyles } from "./SaperStats.styles";
import { useSettingsContext } from "../../../../providers/SettingsContext";

type SaperStatsProps = {
	bestTimes: number[];
};

const SaperStats = ({ bestTimes }: SaperStatsProps) => {
	const { t } = useTranslation();
	const { darkMode } = useSettingsContext();

	return (
		<div className='saperStats' css={saperStatsStyles(darkMode)}>
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
	);
};

export default SaperStats;
