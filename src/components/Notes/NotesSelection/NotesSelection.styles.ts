import { css } from "@emotion/react";

export const notesSelectionStyles = (darkMode: boolean, color: string) => css`
	&.notesSelection {
		height: 4rem;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0.25rem;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: thin;
		scrollbar-color: ${color};
		background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};

		&::-webkit-scrollbar {
			margin: 5px;
			height: 8px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: ${color};
		}

		&::-webkit-scrollbar-track {
			background-color: ${darkMode ? "white" : "black"};
		}

		& .notesWrapper {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 0.25rem;
		}
	}

	@media (min-width: 768px) {
		&.notesSelection {
			height: 5rem;
			padding: 0.5rem;

			& .notesWrapper {
				gap: 0.5rem;
			}
		}
	}
`;
