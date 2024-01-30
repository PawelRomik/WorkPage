import config from "../saper.config";
import { Cell } from "../Saper";
import { useMemo } from "react";
import "./SaperBoard.style.scss";

interface SaperBoardProps {
	board: Cell[][];
	victory: boolean;
	gameOver: boolean;
	placeFlag: (row: number, col: number) => void;
	revealCell: (row: number, col: number) => void;
	handleTouchStart: (row: number, col: number) => void;
}

const SaperBoard = ({ board, victory, gameOver, placeFlag, revealCell, handleTouchStart }: SaperBoardProps) => {
	const { colors } = useMemo(() => config, []);

	const renderedBoard = useMemo(
		() =>
			board.map((row, rowIndex) => (
				<div key={rowIndex} className='saperRow'>
					{row.map((cell, colIndex) => (
						<div
							key={colIndex}
							className={`saperCell${cell.isRevealed ? " saperCellRevealed" : ""}${gameOver && cell.isBomb && !victory ? " saperBomb" : ""}${
								cell.isFlagged ? " saperFlagged" : ""
							}`}
							onClick={() => revealCell(rowIndex, colIndex)}
							onContextMenu={(e) => {
								e.preventDefault();
								placeFlag(rowIndex, colIndex);
							}}
							onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
							style={{ color: colors[cell.neighborBombs] }}
						>
							{cell.isRevealed && !cell.isBomb ? cell.neighborBombs || "" : ""}
							{gameOver && !victory && cell.isBomb && !cell.isFlagged ? "💣" : ""}
							{cell.isFlagged && !cell.isRevealed ? "🚩" : ""}
						</div>
					))}
				</div>
			)),
		[board, colors, gameOver, handleTouchStart, placeFlag, revealCell, victory]
	);

	return <div className='saperBoard'>{renderedBoard}</div>;
};

export default SaperBoard;
