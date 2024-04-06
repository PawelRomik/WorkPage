import { css } from "@emotion/react";

export const videoContainerSectionStyles = (darkMode: boolean) => css`
	&.videoContainerSection {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50%;
		width: 100%;
		padding: 1rem;
		background-color: ${darkMode ? "white" : "black"};

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
