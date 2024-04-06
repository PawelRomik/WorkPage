import { css } from "@emotion/react";

export const videoInputSectionStyles = (darkMode: boolean, color: string) => css`
	&.videoInputSection {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		min-height: 20%;
		width: 100%;
		font-weight: bold;
		gap: 0.5rem;
		border-bottom: 4px solid ${darkMode ? "white" : "black"};

		& label {
			font-size: 1.5rem;
		}

		& .videoInput {
			padding: 0.75rem 1.5rem;
			border-right: none;
			border-radius: 30px 0 0 30px;
			outline: none;
			transition: 0.1s;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};

			&:focus {
				border: 2px solid ${color} !important;
				border-right: none !important;

				& ~ .videoInputButton {
					border: 2px solid ${color} !important;
					border-left: none !important;
				}
			}
		}

		& .videoInputButton {
			transition: 0.1s;
			padding: 0.75rem 1.5rem;
			border-left: none;
			border-radius: 0 30px 30px 0;
			outline: none;
			cursor: pointer;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		&.videoInputSection {
			& > div {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
			}
			& label {
				font-size: 2rem;
			}

			& .videoInput {
				width: 20rem;
				padding: 1.1rem 1rem;
			}
			& .videoInputButton {
				padding: 1.1rem 1rem;
			}
		}
	}
`;
