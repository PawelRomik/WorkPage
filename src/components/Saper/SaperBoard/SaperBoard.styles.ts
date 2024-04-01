import { css } from "@emotion/react";

export const saperBoardStyles = (darkMode: boolean, color: string) => css`
	&.saperBoardContainer {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		& .saperBoard {
			padding: 0.25rem;
			position: relative;
			border: 5px solid ${darkMode ? "#dfdfdf" : "gray"};

			&:not(.saperGameOver) .saperCell:not(.saperCellRevealed):focus,
			&:not(.saperGameOver) .saperCell:not(.saperCellRevealed):hover {
				background-color: ${color} !important;
				cursor: pointer;
			}
		}

		& .game-over {
			position: absolute;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			font-size: 2rem;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			animation: 400ms linear gameOver;

			& > span {
				width: 100%;
				opacity: 0;
				height: 4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				animation: 400ms 400ms linear gameOver forwards;
				background-color: ${color};
			}
		}

		& .saperRow {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		& .saperCell {
			width: 2.25rem;
			height: 2.25rem;
			border: 1px solid black;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: ${darkMode ? "#dfdfdf" : "rgb(54,54,54)"};
			border: 1px solid ${darkMode ? "gray" : "black"};

			&.saperCellRevealed {
				background-color: ${darkMode ? "white" : "gray"};
			}
			&.saperBomb {
				background-color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		& .saperCell {
			width: 4rem;
			height: 4rem;
			font-size: 2rem;
		}
	}

	@media (min-width: 1200px) {
		&.saperBoardContainer {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			& .saperCell {
				width: 3.25rem;
				height: 3.25rem;
			}
		}
	}

	@keyframes gameOver {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
`;
