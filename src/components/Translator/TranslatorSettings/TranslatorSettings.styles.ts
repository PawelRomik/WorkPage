import { css } from "@emotion/react";

export const translatorSettingsStyles = (darkMode: boolean, color: string) => css`
	&.translatorTopSection {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		height: 3rem;
		position: relative;
		background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};

		& button {
			padding: 0.25rem 0.5rem;
			font-size: 1rem;
			height: 2rem;
			cursor: pointer;
			transition: 0.1s;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 4px solid ${darkMode ? "white" : "black"};

			&:focus,
			&:hover {
				border: 4px solid ${color};
				background-color: ${color};
				color: white;
			}
		}

		& .languagesSelection {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.25rem;
		}
	}

	@media (min-width: 768px) {
		&.translatorTopSection {
			height: 5rem;

			& button {
				height: 3rem;
				font-size: 1.5rem;
				&.translationClearButton {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 1rem;
				}
			}

			& .languagesSelection {
				gap: 1rem;
			}
		}
	}
`;
