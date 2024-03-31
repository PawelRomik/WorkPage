import { css } from "@emotion/react";

export const tiptapButtonsStyles = (darkMode: boolean, color: string) => css`
	&.tiptapButtons {
		display: flex;
		justify-content: flex-start;
		margin: 0 auto;
		flex-wrap: wrap;
		width: 100%;
		height: 4.5rem;
		align-items: center;
		background-color: ${darkMode ? "white" : "black"};
		border-top: 3px solid ${darkMode ? "white" : "black"};

		& button {
			cursor: pointer;
			flex: 10%;
			margin: 0.3rem;
			border-radius: 20px;
			font-size: 0.75rem;
			height: 1.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2px solid ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
			background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};
			color: ${darkMode ? "black" : "white"};

			&:hover,
			&:focus {
				border: 3px solid ${color};
			}

			&.is-active {
				background-color: ${color} !important;
				border: 2px solid ${color} !important;
				color: white;

				&:hover,
				&:focus {
					border: 3px solid ${darkMode ? "black" : "white"} !important;
				}
			}

			&:disabled {
				opacity: 0.5;
			}
		}
	}

	@media (min-width: 768px) {
		&.tiptapButtons {
			justify-content: center;
			height: 5.5rem;
			gap: 0.5rem;
			& button {
				flex: 11%;
				width: 2rem;
				margin: 0 0.2rem;
				height: 2.2rem;
			}
		}
	}

	@media (min-width: 1200px) {
		&.tiptapButtons {
			justify-content: center;
			height: 4rem;
			gap: 0.5rem;
			& button {
				flex: initial;
				width: 4rem;
				margin: 0;
				height: 2.5rem;
			}
		}
	}
`;
