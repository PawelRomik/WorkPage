import SaperBoard from "../SaperBoard/SaperBoard";
import { Cell } from "../Saper";
import "./SaperCenter.style.scss";

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
	return (
		<div className='saperCenter'>
			<div>
				<h1>Minesweeper</h1>
				<p className='saperTimer'>{`Time: ${gameTime}s`}</p>
			</div>
			<SaperBoard board={board} victory={victory} gameOver={gameOver} placeFlag={placeFlag} revealCell={revealCell} handleTouchStart={handleTouchStart} />
		</div>
	);
};

export default SaperCenter;
