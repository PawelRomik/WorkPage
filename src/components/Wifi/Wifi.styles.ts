import { css } from "@emotion/react";

export const wifiContainerStyles = (darkMode: boolean, color: string) => css`
	&.wifiContainer {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		width: 10rem;
		height: 4rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		flex-direction: column;

		& > .ipContainer {
			display: flex;
			width: 100%;
			gap: 0.5rem;
			justify-content: center;
			align-items: center;
		}

		& > .wifiConnected {
			justify-content: flex-start;
			width: 100%;
			padding-left: 0.75rem;
		}

		& p {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			position: relative;

			& > i {
				color: ${color};
			}

			&.ipParagraph {
				cursor: pointer;
				padding: 0.25rem 0.5rem;
				background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
				color: ${darkMode ? "black" : "white"};
			}

			& > .hideIpBlock {
				background-color: ${color};
				color: white;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
		}

		& > button {
			background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
			color: ${darkMode ? "black" : "white"};
		}
	}
`;
