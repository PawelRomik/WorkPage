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

export const videoInputSectionStyles = (darkMode: boolean, color: string) => css`
	&.videoInputSection {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		min-height: 20%;
		width: 100%;
		font-weight: bold;
		gap: 0.5rem;
		border-bottom: 4px solid ${darkMode ? "white" : "black"};

		& label {
			font-size: 1.5rem;
		}

		& .videoInput {
			padding: 0.75rem 1.5rem;
			border-right: none;
			border-radius: 30px 0 0 30px;
			outline: none;
			transition: 0.1s;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};

			&:focus {
				border: 2px solid ${color} !important;
				border-right: none !important;

				& ~ .videoInputButton {
					border: 2px solid ${color} !important;
					border-left: none !important;
				}
			}
		}

		& .videoInputButton {
			transition: 0.1s;
			padding: 0.75rem 1.5rem;
			border-left: none;
			border-radius: 0 30px 30px 0;
			outline: none;
			cursor: pointer;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		&.videoInputSection {
			& > div {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
			}
			& label {
				font-size: 2rem;
			}

			& .videoInput {
				width: 20rem;
				padding: 1.1rem 1rem;
			}
			& .videoInputButton {
				padding: 1.1rem 1rem;
			}
		}
	}
`;

export const videoContainerSectionStyles = (darkMode: boolean) => css`
	&.videoContainerSection {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50%;
		width: 100%;
		padding: 1rem;
		background-color: black;

		& .playerWrapper {
			width: 95%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2rem;
			& > div {
				border: 5px solid ${darkMode ? "white" : "black"};
			}
		}
	}

	@media (min-width: 768px) {
		&.videoContainerSection {
			min-height: 50%;
			& .playerWrapper {
				width: 80%;
			}
		}
	}

	@media (min-width: 1200px) {
		&.videoContainerSection {
			min-height: 70%;
			& .playerWrapper {
				width: 70%;
			}
		}
	}
`;

export const videoHistorySectionStyles = (darkMode: boolean, color: string) => css`
	&.videoHistorySection {
		height: 100%;
		width: 100%;

		min-height: 80%;
		border-top: 4px solid ${darkMode ? "white" : "black"};

		& > p {
			width: 100%;
			text-align: center;
			color: ${darkMode ? "black" : "white"};
			font-weight: bold;
			font-size: 1.5rem;
			margin-top: 1rem;
		}

		& > div {
			display: grid;
			gap: 0.5rem;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(4, 1fr);
			padding: 1rem 0.5rem;
		}

		& .videoHistoryItem {
			height: 100%;
			display: flex;
			overflow: hidden;
			justify-content: center;
			align-items: center;
			border: 3px solid ${darkMode ? "white" : "black"};

			color: ${darkMode ? "white" : "black"};
			&:hover,
			&:focus {
				border-color: ${color};
			}

			& p {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				gap: 0.5rem;

				& i {
					font-size: 2rem;
				}
			}

			& img {
				width: 100%;
				height: 133%;
				cursor: pointer;
			}
		}
	}

	@media (min-width: 768px) {
		&.videoHistorySection {
			min-height: 20%;

			& > div {
				grid-template-columns: repeat(4, 1fr);
				grid-template-rows: repeat(2, 1fr);
			}

			& > p {
				font-size: 2rem;
			}

			& .videoHistoryItem {
				& p {
					font-size: 1.5rem;
					& i {
						font-size: 2.5rem;
					}
				}
			}
		}
	}
`;
