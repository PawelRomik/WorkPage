import { css } from "@emotion/react";

export const videoPlayerStyles = (darkMode: boolean) => css`
	&.videoPlayer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		overflow-x: hidden;
		overflow-y: auto;
		align-items: center;
		flex-direction: column;
		background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
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
