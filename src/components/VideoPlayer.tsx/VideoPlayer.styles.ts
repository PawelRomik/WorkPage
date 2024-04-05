import { css } from "@emotion/react";

export const videoPlayerStyles = (darkMode: boolean) => css`
	&.videoPlayer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		overflow-y: auto;
		align-items: center;
		flex-direction: column;
		background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
	}
`;

export const videoInputSectionStyles = (darkMode: boolean) => css`
	&.videoInputSection {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		min-height: 20%;
		width: 100%;
		border-bottom: 4px solid ${darkMode ? "white" : "black"};
	}
`;

export const videoContainerSectionStyles = () => css`
	&.videoContainerSection {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50%;
	}
`;

export const videoHistorySectionStyles = (darkMode: boolean) => css`
	&.videoHistorySection {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 0.5rem;
		min-height: 80%;
		border-top: 4px solid ${darkMode ? "white" : "black"};
		padding: 1rem 0;

		& .videoHistoryItem {
			height: 100%;
			display: flex;
			overflow: hidden;
			justify-content: center;
			align-items: center;

			color: ${darkMode ? "white" : "black"};

			& p {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				gap: 0.5rem;
				border: 3px solid ${darkMode ? "white" : "black"};

				& i {
					font-size: 2rem;
				}
			}

			& img {
				width: 100%;
				height: 100%;
				cursor: pointer;
				border: 3px solid ${darkMode ? "white" : "black"};
			}
		}
	}
`;
