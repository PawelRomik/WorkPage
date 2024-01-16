import "./Saper.style.scss";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const rows = 8;
const columns = 8;
const totalBombs = 12;

const colors = ["white", "blue", "green", "red", "purple", "orange", "cyan", "darkgreen", "darkred"];

type Cell = {
	isBomb: boolean;
	isRevealed: boolean;
	neighborBombs: number;
	isFlagged: boolean;
};

const Saper = () => {
	const [board, setBoard] = useState<Cell[][]>([]);
	const [gameOver, setGameOver] = useState(false);
	const [revealedCount, setRevealedCount] = useState(0);

	const initializeBoard = () => {
		const newBoard: Cell[][] = [];

		for (let i = 0; i < rows; i++) {
			const newRow: Cell[] = [];

			for (let j = 0; j < columns; j++) {
				newRow[j] = { isBomb: false, isRevealed: false, neighborBombs: 0, isFlagged: false };
			}
			newBoard.push(newRow);
		}

		let placedBombs = 0;
		while (placedBombs < totalBombs) {
			const row = Math.floor(Math.random() * rows);
			const col = Math.floor(Math.random() * columns);

			if (!newBoard[row][col].isBomb) {
				newBoard[row][col].isBomb = true;
				placedBombs++;
			}
		}

		return newBoard;
	};
	const revealCell = (row: number, col: number, flag: boolean = false) => {
		if (gameOver || board[row][col].isRevealed) {
			return;
		}

		const newBoard: Cell[][] = [...board];
		if (!newBoard[row][col].isFlagged || flag) {
			newBoard[row][col].isRevealed = true;
			setRevealedCount((prevCount) => prevCount + 1);

			if (newBoard[row][col].isBomb) {
				setGameOver(true);
			} else {
				const neighbors = getNeighbors(row, col);
				const neighborBombs = neighbors.filter((n) => newBoard[n[0]][n[1]].isBomb).length;
				newBoard[row][col].neighborBombs = neighborBombs;
				if (neighborBombs === 0) {
					neighbors.forEach(([row, column]) => revealCell(row, column, true));
				}
			}
			setBoard(newBoard);
		}
	};

	useEffect(() => {
		if (revealedCount === rows * columns - totalBombs) {
			setGameOver(true);
		}
	}, [revealedCount]);

	const getNeighbors = (row: number, col: number): [number, number][] => {
		const neighbors: [number, number][] = [];

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const newRow = row + i;
				const newCol = col + j;

				if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && !(i === 0 && j === 0)) {
					neighbors.push([newRow, newCol]);
				}
			}
		}

		return neighbors;
	};

	useEffect(() => {
		setBoard(initializeBoard());
	}, []);

	const playAgain = () => {
		setBoard(initializeBoard());
		setGameOver(false);
		setRevealedCount(0);
	};

	const placeFlag = (row: number, col: number) => {
		if (gameOver || board[row][col].isRevealed) {
			return;
		}
		const newBoard = [...board];
		newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
		setBoard(newBoard);
	};

	const handleTouchStart = (row: number, col: number) => {
		const touchTimer = setTimeout(() => placeFlag(row, col), 500);

		return clearTimeout(touchTimer);
	};

	const renderBoard = () => (
		<div className='saperBoard'>
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className='saperRow'>
					{row.map((cell, colIndex) => (
						<div
							key={colIndex}
							className={`saperCell${cell.isRevealed ? " saperCellRevealed" : ""}${gameOver && cell.isBomb && revealedCount !== rows * columns - totalBombs ? " saperBomb" : ""}${
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
							{gameOver && cell.isBomb ? "💣" : ""}
							{cell.isFlagged && !cell.isRevealed && !gameOver ? "🚩" : ""}
						</div>
					))}
				</div>
			))}
		</div>
	);

	return (
		<div className='saperContainer'>
			{gameOver && revealedCount === rows * columns - totalBombs && <Confetti />}
			<h1>Minesweeper</h1>
			{renderBoard()}
			<div className='saperEndScreen'>
				<p className='game-over'>{gameOver ? (revealedCount === rows * columns - totalBombs ? "You won!" : "Game Over!") : ""}</p>
				<button className='saperButton' onClick={playAgain}>
					{gameOver ? "Play again" : "Restart"}
				</button>
			</div>
		</div>
	);
};

export default Saper;
