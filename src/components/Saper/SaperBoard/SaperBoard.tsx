import config from "../saper.config";
import { Cell } from "../Saper";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import { saperBoardStyles } from "./SaperBoard.styles";

type SaperBoardProps = {
	board: Cell[][];
	victory: boolean;
	gameOver: boolean;
	placeFlag: (row: number, col: number) => void;
	revealCell: (row: number, col: number) => void;
	handleTouchStart: (row: number, col: number) => void;
	loading: boolean;
	animationEnd: () => void;
};

const { colors } = config;

const SaperBoard = ({ board, victory, gameOver, placeFlag, revealCell, handleTouchStart, animationEnd, loading }: SaperBoardProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

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
		[board, gameOver, handleTouchStart, placeFlag, revealCell, victory]
	);

	const saperClass = useMemo(() => `saperBoard ${gameOver && "saperGameOver"}`, [gameOver]);
	const gameOverText = useMemo(() => (gameOver ? (victory ? t("Minesweeper.minesweeperWin") : t("Minesweeper.minesweeperLose")) : ""), [gameOver, victory, t]);

	return (
		<div className='saperBoardContainer' css={saperBoardStyles(darkMode, color)}>
			{loading ? (
				<LoadingAnimation animationEnd={animationEnd} repeats={1} />
			) : (
				<div className={saperClass}>
					{gameOver && (
						<p className='game-over'>
							<span>{gameOverText}</span>
						</p>
					)}
					{renderedBoard}
				</div>
			)}
		</div>
	);
};

export default SaperBoard;
