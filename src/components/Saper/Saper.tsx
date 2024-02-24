import "./Saper.style.scss";
import { useState, useEffect, useCallback, useMemo } from "react";
import Confetti from "react-confetti";
import config from "./saper.config";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";
import LocalStorageNames from "../../utils/localstorageNames";
import SaperCenter from "./SaperCenter/SaperCenter";
import SaperEndScreen from "./SaperEndScreen/SaperEndScreen";

export type Cell = {
	isBomb: boolean;
	isRevealed: boolean;
	neighborBombs: number;
	isFlagged: boolean;
};

const Saper = () => {
	const { darkMode } = useSettingsContext();

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

				.saperDifficultyButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};

					&.saperEasy.saperDifficultyActive {
						background-color: green;
						color: white;
					}

					&.saperNormal.saperDifficultyActive {
						background-color: orange;
						color: white;
					}

					&.saperHard.saperDifficultyActive {
						background-color: red;
						color: white;
					}
				}

				.saperStats {
					background-color: ${darkMode ? "white" : "black"};
					border: 2px solid ${darkMode ? "#c9c2c2" : "white"};
					color: ${darkMode ? "black" : "white"};
				}

				@media (min-width: 1200px) {
					.saperEndScreen {
						background-color: ${darkMode ? "#ebe9e9" : "rgb(36, 36, 36)"};
					}
				}
			}
		`,
		[darkMode]
	);

	const [board, setBoard] = useState<Cell[][]>([]);
	const [difficulty, setDifficulty] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [revealedCount, setRevealedCount] = useState(0);
	const [firstClick, changeFirstClick] = useState(true);
	const [gameTime, setGameTime] = useState(0);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const { rows, columns, totalBombs } = useMemo(() => config, []);
	const victory = useMemo(() => revealedCount === rows[difficulty] * columns[difficulty] - totalBombs[difficulty], [revealedCount, columns, rows, totalBombs, difficulty]);
	const [bestTimes, setBestTimes] = useState<number[]>([]);
	const { localSaperBestTimes } = useMemo(() => LocalStorageNames, []);

	useEffect(() => {
		const storedBestTimes = localStorage.getItem(localSaperBestTimes);
		if (storedBestTimes) {
			setBestTimes(JSON.parse(storedBestTimes));
		}
	}, [localSaperBestTimes]);

	const saveBestTime = useCallback(
		(time: number) => {
			const updatedBestTimes = [...bestTimes];
			updatedBestTimes[difficulty] = time;
			localStorage.setItem(localSaperBestTimes, JSON.stringify(updatedBestTimes));
			setBestTimes(updatedBestTimes);
		},
		[bestTimes, difficulty, localSaperBestTimes]
	);

	useEffect(() => {
		let resizeTimeout: NodeJS.Timeout;

		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (window.innerWidth < 1200) {
					setDifficulty(0);
				}
			}, 100);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const initializeBoard = useCallback(() => {
		const newBoard: Cell[][] = [];

		for (let i = 0; i < rows[difficulty]; i++) {
			const newRow: Cell[] = [];

			for (let j = 0; j < columns[difficulty]; j++) {
				newRow[j] = { isBomb: false, isRevealed: false, neighborBombs: 0, isFlagged: false };
			}
			newBoard.push(newRow);
		}

		let placedBombs = 0;
		while (placedBombs < totalBombs[difficulty]) {
			const row = Math.floor(Math.random() * rows[difficulty]);
			const col = Math.floor(Math.random() * columns[difficulty]);

			if (!newBoard[row][col].isBomb) {
				newBoard[row][col].isBomb = true;
				placedBombs++;
			}
		}
		return newBoard;
	}, [columns, rows, totalBombs, difficulty]);

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

					if (newRow >= 0 && newRow < rows[difficulty] && newCol >= 0 && newCol < columns[difficulty] && !(i === 0 && j === 0)) {
						neighbors.push([newRow, newCol]);
					}
				}
			}

			return neighbors;
		},
		[columns, rows, difficulty]
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
			const currentTime = gameTime;
			const bestTime = bestTimes[difficulty];
			if (!bestTime || currentTime < bestTime) {
				saveBestTime(currentTime);
			}
		}
	}, [victory, stopTimer, bestTimes, difficulty, gameTime, saveBestTime]);

	const playAgain = useCallback(() => {
		setBoard(initializeBoard());
		setGameOver(false);
		setRevealedCount(0);
		changeFirstClick(true);
		stopTimer();
		setGameTime(0);
	}, [initializeBoard, stopTimer]);

	const changeDifficultyOnClick = useCallback(
		(passedDifficulty: number) => {
			setDifficulty(passedDifficulty);
			playAgain();
		},
		[playAgain]
	);

	return (
		<div className='saperContainer' css={darkModeStyles}>
			{victory && <Confetti />}
			<SaperCenter board={board} victory={victory} gameOver={gameOver} gameTime={gameTime} handleTouchStart={handleTouchStart} revealCell={revealCell} placeFlag={placeFlag} />
			<SaperEndScreen bestTimes={bestTimes} gameOver={gameOver} victory={victory} difficulty={difficulty} changeDifficultyOnClick={changeDifficultyOnClick} playAgain={playAgain} />
		</div>
	);
};

export default Saper;
