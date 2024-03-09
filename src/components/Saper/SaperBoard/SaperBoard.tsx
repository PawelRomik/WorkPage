import config from "../saper.config";
import { Cell } from "../Saper";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import "./SaperBoard.style.scss";

type SaperBoardProps = {
	board: Cell[][];
	victory: boolean;
	gameOver: boolean;
	placeFlag: (row: number, col: number) => void;
	revealCell: (row: number, col: number) => void;
	handleTouchStart: (row: number, col: number) => void;
};

const SaperBoard = ({ board, victory, gameOver, placeFlag, revealCell, handleTouchStart }: SaperBoardProps) => {
	const { color } = useSettingsContext();
	const { t } = useTranslation();
	const saperBombStyles = useMemo(
		() => css`
			&.saperBomb {
				background-color: ${color} !important;
			}
		`,
		[color]
	);

	const { colors } = useMemo(() => config, []);

	const renderedBoard = useMemo(
		() =>
			board.map((row, rowIndex) => (
				<div key={rowIndex} className='saperRow'>
					{row.map((cell, colIndex) => (
						<div
							css={saperBombStyles}
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
		[board, colors, gameOver, handleTouchStart, placeFlag, revealCell, victory, saperBombStyles]
	);

	const saperClass = useMemo(() => `saperBoard ${gameOver && "saperGameOver"}`, [gameOver]);
	const gameOverText = useMemo(() => (gameOver ? (victory ? t("Minesweeper.minesweeperWin") : t("Minesweeper.minesweeperLose")) : ""), [gameOver, victory, t]);

	return (
		<div className='saperBoardContainer'>
			<p className='game-over'>
				<span>{gameOverText}</span>
			</p>
			<div className={saperClass}>{renderedBoard}</div>
		</div>
	);
};

export default SaperBoard;
