import { css } from "@emotion/react";

export const userWindowStyles = (darkMode: boolean, color: string) => css`
	&.userWindow {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 14rem;
		height: 5rem;
		font-size: 0.9rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};

		& p {
			font-weight: bold;
		}

		& button {
			cursor: pointer;
			outline: none;
			border: none;
			padding: 0.5rem 1rem;
			background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
			color: ${darkMode ? "black" : "white"};
			&:hover,
			&:focus {
				background-color: ${color} !important;
				color: white !important;
			}
		}
	}
`;
