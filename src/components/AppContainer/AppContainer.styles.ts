import { css } from "@emotion/react";

const animationDuration = "150ms";

export const appContainerBackgroundStyles = () => css`
	&.appContainerBackground {
		width: 100vw;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 2;
		overflow: hidden;
		animation: ${animationDuration} linear background;

		&.offAnimation {
			animation: ${animationDuration} linear backgroundhide forwards;
		}
	}
`;

export const appContainerStyles = (darkMode: boolean) => css`
	& .offAnimation .appContainer {
		animation: $animationDuration linear hide forwards;
	}

	&.appContainer {
		background-color: ${darkMode ? "rgb(212, 212, 212)" : "rgb(39, 39, 39)"};
		border: ${darkMode ? "6px solid white" : "6px solid black"};
		position: absolute;
		bottom: 50%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		transform: translate(-50%, 50%);
		left: 50%;
		width: 95%;
		height: 95%;
		z-index: 3;
		overflow: hidden;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		animation: ${animationDuration} linear popup;
		max-width: 1920px;
	}

	@media (min-width: 1200px) {
		&.appContainer.smallContainer {
			width: 50%;
		}
	}

	@keyframes popup {
		0% {
			bottom: -2000px;
			opacity: 0;
			transform: translate(-50%, 50%) scale(0);
		}

		100% {
			bottom: 50%;
			opacity: 1;
			transform: translate(-50%, 50%) scale(1);
		}
	}

	@keyframes hide {
		0% {
			bottom: 50%;
			opacity: 1;
			transform: translate(-50%, 50%) scale(1);
		}

		100% {
			bottom: -2000px;
			opacity: 0;
			transform: translate(-50%, 50%) scale(0);
		}
	}

	@keyframes background {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes backgroundhide {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;

export const appContainerContentStyles = () => css`
	&.appContainerContent {
		flex: 1;
		overflow: hidden;
	}
`;
