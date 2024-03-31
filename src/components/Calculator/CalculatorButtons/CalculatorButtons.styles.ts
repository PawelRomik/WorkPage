import { css } from "@emotion/react";

export const calculatorButtonsContainerStyle = (darkMode: boolean) => css`
	&.calculatorButtonsContainer {
		flex: 3;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(6, 1fr);
		border: none;
		width: 100%;
		padding: 0.25rem 0;
		background-color: ${darkMode ? "white" : "black"};
	}
`;

export const calculatorButtonStyle = (darkMode: boolean, color: string) => css`
	& .calculatorButton {
		font-weight: bold;
		border: none;
		font-size: 1.25rem;
		width: 100%;
		height: 100%;
		cursor: pointer;
		outline: none;
		transition: 0.1s;
		background-color: ${darkMode ? " rgb(231,231,231)" : "rgb(77, 77, 77)"};
		color: ${darkMode ? "black" : "white"};
		border: 0.1rem ${darkMode ? "white" : "black"} solid;

		&:hover,
		&:focus {
			background-color: ${color};
			color: white;
		}
	}

	@media (min-width: 768px) {
		& .calculatorButton {
			font-size: 2rem;
		}
	}
`;
