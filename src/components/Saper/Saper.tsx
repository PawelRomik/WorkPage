import "./Saper.style.scss";
import { useState, useEffect, useCallback, useMemo } from "react";
import Confetti from "react-confetti";
import SaperBoard from "./SaperBoard/SaperBoard";
import config from "./saper.config";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

export type Cell = {
	isBomb: boolean;
	isRevealed: boolean;
	neighborBombs: number;
	isFlagged: boolean;
};

const Saper = () => {
	const { color, darkMode } = useSettingsContext();

	const resetButtonStyles = useMemo(
		() => css`
			&:hover,
			&:focus {
				background-color: ${color} !important;
				color: white !important;
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.saperContainer {
				background-color: ${darkMode ? "lightgray" : "rgb(27,27,27)"};
				color: ${darkMode ? "black" : "white"};

				.saperButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};
				}
			}
		`,
		[darkMode]
	);

	const [board, setBoard] = useState<Cell[][]>([]);
	const [gameOver, setGameOver] = useState(false);
	const [revealedCount, setRevealedCount] = useState(0);
	const [firstClick, changeFirstClick] = useState(true);
	const [gameTime, setGameTime] = useState(0);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const { rows, columns, totalBombs } = useMemo(() => config, []);
	const victory = useMemo(() => revealedCount === rows * columns - totalBombs, [revealedCount, columns, rows, totalBombs]);

	const initializeBoard = useCallback(() => {
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
	}, [columns, rows, totalBombs]);

	const startTimer = useCallback(() => {
		const newTimer = setInterval(() => {
			setGameTime((time) => time + 1);
		}, 1000);

		setTimer(newTimer);
	}, []);

	const stopTimer = useCallback(() => {
		if (timer) {
			clearInterval(timer);
			setTimer(null);
		}
	}, [timer]);

	useEffect(() => {
		setBoard(initializeBoard());
	}, [initializeBoard]);

	const placeFlag = useCallback(
		(row: number, col: number) => {
			if (gameOver || board[row][col].isRevealed || firstClick) {
				return;
			}
			const newBoard = [...board];
			newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
			setBoard(newBoard);
		},
		[board, firstClick, gameOver]
	);

	const handleTouchStart = useCallback(
		(row: number, col: number) => {
			const touchTimer = setTimeout(() => placeFlag(row, col), 500);

			return clearTimeout(touchTimer);
		},
		[placeFlag]
	);

	const getNeighbors = useCallback(
		(row: number, col: number): [number, number][] => {
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
		},
		[columns, rows]
	);

	const revealHelper = useMemo(
		() => (newBoard: Cell[][], startRow: number, startCol: number) => {
			const stack = [[startRow, startCol]];

			while (stack.length > 0) {
				const [row, col] = stack.pop() as [number, number];

				if (!newBoard[row][col].isRevealed) {
					newBoard[row][col].isRevealed = true;

					if (newBoard[row][col].isBomb) {
						setGameOver(true);
						stopTimer();
						return;
					} else {
						setRevealedCount((prevCount) => prevCount + 1);
					}

					const neighbors = getNeighbors(row, col);
					const neighborBombs = neighbors.filter((n) => newBoard[n[0]][n[1]].isBomb).length;
					newBoard[row][col].neighborBombs = neighborBombs;

					if (neighborBombs === 0) {
						stack.push(...neighbors.filter(([r, c]) => !newBoard[r][c].isRevealed));
					}
				}
			}

			setBoard(newBoard);
		},
		[getNeighbors, stopTimer]
	);

	const revealCell = useCallback(
		(row: number, col: number) => {
			if (gameOver || board[row][col].isRevealed) {
				return;
			}

			if (firstClick) {
				let newBoard = initializeBoard();
				while (newBoard[row][col].isBomb) {
					newBoard = initializeBoard();
				}
				setBoard(newBoard);
				changeFirstClick(false);
				revealHelper(newBoard, row, col);
				startTimer();
				return;
			}

			const newBoard: Cell[][] = [...board];
			if (!newBoard[row][col].isFlagged) {
				revealHelper(newBoard, row, col);
				setBoard(newBoard);
			}
		},
		[board, firstClick, gameOver, initializeBoard, revealHelper, startTimer]
	);

	useEffect(() => {
		if (victory) {
			setGameOver(true);
			stopTimer();
		}
	}, [victory, stopTimer]);

	const playAgain = useCallback(() => {
		setBoard(initializeBoard());
		setGameOver(false);
		setRevealedCount(0);
		changeFirstClick(true);
		stopTimer();
		setGameTime(0);
	}, [initializeBoard, stopTimer]);

	const gameOverText = useMemo(() => (gameOver ? (victory ? "You won!" : "Game Over!") : ""), [gameOver, victory]);
	const gameOverButtonText = useMemo(() => (gameOver ? "Play again" : "Restart"), [gameOver]);

	return (
		<div className='saperContainer' css={darkModeStyles}>
			{victory && <Confetti />}
			<h1>Minesweeper</h1>
			<p className='saperTimer'>{`Time: ${gameTime}s`}</p>
			<SaperBoard board={board} victory={victory} gameOver={gameOver} placeFlag={placeFlag} revealCell={revealCell} handleTouchStart={handleTouchStart} />
			<div className='saperEndScreen'>
				<p className='game-over'>{gameOverText}</p>
				<button className='saperButton' css={resetButtonStyles} onClick={playAgain}>
					{gameOverButtonText}
				</button>
			</div>
		</div>
	);
};

export default Saper;
