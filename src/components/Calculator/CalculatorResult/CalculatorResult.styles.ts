import { css } from "@emotion/react";

export const calculatorResultStyles = (darkMode: boolean) => css`
	&.calculatorResult {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 2rem;
		color: black;
		cursor: pointer;
		color: ${darkMode ? "black" : "white"};
		background-color: ${darkMode ? "lightgray" : "#hhhhhh"};
	}

	@media (min-width: 768px) {
		&.calculatorResult {
			font-size: 3.5rem;
		}
	}
`;

export const calculatorTopStyles = (color: string) => css`
	&.calculatorTop {
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		color: ${color};
		font-size: 1.25rem;
		@media (min-width: 768px) {
			.calculatorTop {
				font-size: 2rem;
			}
		}
	}
`;

export const calculatorBottomStyles = () => css`
	width: 90%;
	overflow: hidden;
	text-overflow: ellipsis;
`;
