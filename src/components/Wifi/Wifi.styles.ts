import { css } from "@emotion/react";

export const wifiContainerStyles = (darkMode: boolean, color: string) => css`
	&.wifiContainer {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		width: 10rem;
		height: 3rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		flex-direction: column;

		& > p {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;

			& > i {
				color: ${color};
			}
		}

		& > button {
			background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
			color: ${darkMode ? "black" : "white"};
		}
	}
`;
