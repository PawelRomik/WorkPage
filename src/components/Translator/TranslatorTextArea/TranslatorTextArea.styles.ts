import { css } from "@emotion/react";

export const translatorTextAreaStyles = (darkMode: boolean, color: string) => css`
	&.translatorBottomSection {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 0.25rem;

		& .translateTextArea {
			height: 100%;
			flex: 1;
			display: flex;
			vertical-align: top;
			outline: none;
			padding: 0.5rem;
			font-size: 1rem;
			resize: none;
			background-color: ${darkMode ? "white" : "rgb(54,54,54)"};
			border: 2px solid ${darkMode ? "white" : "rgb(54,54,54)"};
			color: ${darkMode ? "black" : "white"};
			&:focus {
				border: 2px solid ${color};
			}
		}

		& .translateResult {
			height: 100%;
			flex: 1;
			padding: 0.5rem;
			font-size: 1rem;
			word-break: break-all;
			background-color: ${darkMode ? "white" : "rgb(54,54,54)"};
			border: 2px solid ${darkMode ? "white" : "rgb(54,54,54)"};
			color: ${darkMode ? "black" : "white"};

			&:focus {
				border: 2px solid ${color};
			}

			& .translateResultParagraph {
				height: 100%;
				flex: 1;
				word-break: break-all;
				cursor: pointer;
			}

			& .translatorLoading {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.5rem;
				flex-direction: column;
			}
		}
	}

	@media (min-width: 768px) {
		&.translatorBottomSection {
			& .translateTextArea,
			& .translateResult,
			& .translateResultParagraph {
				font-size: 1.5rem;
			}
		}
	}
`;
