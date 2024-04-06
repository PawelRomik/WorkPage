import { css } from "@emotion/react";
export const videoHistorySectionStyles = (darkMode: boolean, color: string) => css`
	&.videoHistorySection {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 2rem;
		min-height: 100%;
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
			width: 100%;
			height: 100%;
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
			&.hasVideo:hover,
			&.hasVideo:focus {
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
			min-height: 50%;

			& > div {
				height: 35rem;
				grid-template-columns: repeat(4, 1fr);
				grid-template-rows: repeat(2, 1fr);
			}

			& > p {
				font-size: 2rem;
			}

			& .videoHistoryItem {
				height: 70%;
				& p {
					font-size: 1.5rem;
					& i {
						font-size: 2.5rem;
					}
				}
			}
		}
	}

	@media (min-width: 1200px) {
		&.videoHistorySection {
			min-height: 80%;

			& > div {
				width: 80%;
			}
		}
	}
`;
