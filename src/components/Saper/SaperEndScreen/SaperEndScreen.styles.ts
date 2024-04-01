import { css } from "@emotion/react";

export const saperEndScreenStyles = (darkMode: boolean, color: string) => css`
	&.saperEndScreen {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		gap: 1rem;
		flex-direction: column;
		width: 100%;
		padding: 0.5rem;
		background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};

		& .saperButton {
			transition: 0.1s;
			padding: 0.75rem 1.5rem;
			border-radius: 30px;
			outline: none;
			cursor: pointer;
			color: ${darkMode ? "black" : "white"};
			background-color: ${darkMode ? "white" : "black"};
			border: 2px solid ${darkMode ? "white" : "black"};
			transition: 0.2s opacity;

			&:disabled {
				opacity: 0.2;

				cursor: default;
			}

			&:not([disabled]):hover,
			&:not([disabled]):focus {
				background-color: ${color} !important;
				color: white !important;
			}
		}
	}

	@media (min-width: 768px) {
		&.saperEndScreen {
			.saperButton {
				font-size: 2rem;
			}
		}
	}

	@media (min-width: 1200px) {
		&.saperEndScreen {
			height: 100%;
			display: flex;
			width: 45%;
			justify-content: space-around;
			border-left: 3px solid gray;
			border-right: 3px solid gray;

			& .saperRightButtons {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				gap: 1rem;
			}
		}
	}
`;
