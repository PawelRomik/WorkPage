import { css } from "@emotion/react";

export const settingsContainerStyles = (darkMode: boolean) => css`
	&.settingsContainer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		overflow-y: scroll;
		background-color: ${darkMode ? "lightgray" : "rgb(27, 27, 27)"};
		color: ${darkMode ? "black" : "white"};

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: ${darkMode ? "darkgray" : "black"};
		}

		&::-webkit-scrollbar-track {
			background-color: ${darkMode ? "white" : "rgb(12, 12, 12)"};
		}
	}
`;
