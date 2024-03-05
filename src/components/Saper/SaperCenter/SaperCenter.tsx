import SaperBoard from "../SaperBoard/SaperBoard";
import { Cell } from "../Saper";
import "./SaperCenter.style.scss";
import { useTranslation } from "react-i18next";

type SaperCenterProps = {
	board: Cell[][];
	victory: boolean;
	gameOver: boolean;
	gameTime: number;
	handleTouchStart: (row: number, col: number) => void;
	revealCell: (row: number, col: number) => void;
	placeFlag: (row: number, col: number) => void;
};

const SaperCenter = ({ board, victory, gameOver, gameTime, handleTouchStart, revealCell, placeFlag }: SaperCenterProps) => {
	const { t } = useTranslation();
	return (
		<div className='saperCenter'>
			<div>
				<h1>{t("Minesweeper.minesweeperTitle")}</h1>
				<p className='saperTimer'>{`${t("Minesweeper.minesweeperTime")}: ${gameTime}s`}</p>
			</div>
			<SaperBoard board={board} victory={victory} gameOver={gameOver} placeFlag={placeFlag} revealCell={revealCell} handleTouchStart={handleTouchStart} />
		</div>
	);
};

export default SaperCenter;
