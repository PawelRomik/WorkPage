import { css } from "@emotion/react";

export const saperDifficultyStyles = (darkMode: boolean) => css`
	&.saperDifficulty {
		display: none;
	}

	@media (min-width: 1200px) {
		&.saperDifficulty {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;

			& .saperDifficultyButton {
				transition: 0.1s;
				padding: 0.75rem 1.5rem;
				border-radius: 30px;
				outline: none;
				cursor: pointer;

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
		}
	}
`;
