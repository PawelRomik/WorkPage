import { css } from "@emotion/react";

export const notesButtonStyles = (darkMode: boolean, color: string) => css`
	&.noteButton {
		width: 3rem;
		height: 3rem;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		transition: 0.1s;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.25rem;
		background-color: ${darkMode ? "white" : "black"};
		border: 2px solid ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};

		& .removeNote {
			font-weight: bold;
			display: none;
			position: absolute;
			top: -2px;
			right: -2px;
			width: 1.25rem;
			height: 1.25rem;
			cursor: pointer;
			border-color: inherit;
			transition: 0.1s color;
		}

		&.addNewNote {
			transition: 0.2s;
			font-size: 2rem;
			background-color: ${color} !important;
			border: 2px solid ${color} !important;
			color: white !important;

			&:hover,
			&:focus {
				border-color: white;
				color: white;
				background-color: ${color} !important;
			}
		}

		&:hover,
		&:focus {
			border: 2px solid ${darkMode ? "black" : "white"} !important;
			& .removeNote {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: ${darkMode ? "white" : "black"};
				border: 2px solid ${darkMode ? "black" : "white"};
				color: ${darkMode ? "black" : "white"};
				&:hover,
				&:focus {
					color: ${color};
				}
			}
		}

		&.active {
			border: 2px solid ${color} !important;
			background-color: ${color} !important;
			color: white !important;
			&:hover,
			&:focus {
				border: 2px solid ${darkMode ? "black" : "white"} !important;
			}
			& .removeNote {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
			}
		}
	}

	@media (min-width: 768px) {
		&.noteButton {
			width: 3.5rem;
			height: 3.5rem;

			& .removeNote {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
`;
