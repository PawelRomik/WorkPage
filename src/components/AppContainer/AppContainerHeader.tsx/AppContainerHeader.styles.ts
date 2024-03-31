import { css } from "@emotion/react";

export const appContainerHeaderStyles = (darkMode: boolean) => css`
	&.appContainerHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 1rem;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
	}
`;

export const closeButtonStyles = (darkMode: boolean, color: string) => css`
	&.closeButton {
		background-color: transparent;
		width: 3.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		border: none;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		color: ${darkMode ? "black" : "white"};

		&:hover,
		&:focus {
			color: white;
			background-color: ${color};
		}
	}
`;
