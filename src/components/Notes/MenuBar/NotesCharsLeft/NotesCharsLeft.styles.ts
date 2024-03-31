import { css } from "@emotion/react";

export const notesCharsLeftStyles = (darkMode: boolean) => css`
	&.charsLeft {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 3;
		width: 9rem;
		height: 2rem;
		border-radius: 300px 0 0 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
	}

	@media (min-width: 768px) {
		&.charsLeft {
			width: 12rem;
			height: 3rem;
			font-size: 1rem;
		}
	}
`;
