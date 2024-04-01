import { css } from "@emotion/react";

export const paintToolsStyles = (darkMode: boolean, color: string) => css`
	&.paintTools {
		height: 10rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		flex-direction: column;
		background-color: ${darkMode ? "lightgray" : "rgb(27,27,27)"};
		color: ${darkMode ? "black" : "white"};

		& .paintToolsGroup {
			display: flex;
			padding: 0 0.5rem;
			justify-content: space-between;
			align-items: center;
			text-align: center;
			width: 100%;
			gap: 0.5rem;
		}

		& .paintSizeParagraph {
			text-align: right;
			width: 5.5rem;
		}

		& .paintInputContainer {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;

			& .paintInputColor {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-color: transparent;
				width: 2.5rem;
				height: 2.5rem;
				border: none;
				cursor: pointer;
				outline: none;

				&::-webkit-color-swatch {
					border-radius: 50%;
					border: 2px solid ${darkMode ? "black" : "white"};
				}

				&::-moz-color-swatch {
					border-radius: 50%;
					border: 2px solid ${darkMode ? "black" : "white"};
				}

				&:focus-within::-webkit-color-swatch {
					border: 2px solid ${color};
				}

				&:focus-within::-moz-color-swatch {
					border: 2px solid ${color};
				}
			}

			& .paintInputThickness {
				border-radius: 30px;
				outline: none;
				-webkit-appearance: none;
				appearance: none;
				outline: none;
				width: 3.5rem;
				height: 2rem;
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 2px solid ${darkMode ? "black" : "white"};

				&::-webkit-slider-thumb {
					border: 2px solid ${darkMode ? "black" : "white"};
					-webkit-appearance: none;
					appearance: none;
					border-radius: 30px;
					width: 25px;
					height: 25px;

					cursor: pointer;
				}

				&:focus::-webkit-slider-thumb {
					background-color: white;
				}

				&:focus {
					background-color: ${color};
					color: ${color};
				}
			}
		}

		& .paintButtons {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
		}

		& .paintButton {
			padding: 0.25rem;
			border-radius: 30px;
			width: 2rem;
			height: 2rem;
			cursor: pointer;

			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "black" : "white"};

			&.paintEraserActive {
				color: ${darkMode ? "white" : "black"};
				background-color: ${darkMode ? "black" : "white"};
			}
			&:hover,
			&:focus {
				background-color: ${color};
				color: white;
			}
		}
	}

	@media (min-width: 768px) {
		&.paintTools {
			font-size: 1.25rem;

			& .paintSizeParagraph {
				width: 7.5rem;
			}

			& .paintInputThickness {
				width: 6rem;
			}

			& .paintButton {
				width: 4rem;
				font-size: 1rem;
			}
		}
	}
`;
