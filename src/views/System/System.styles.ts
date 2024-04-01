import { css } from "@emotion/react";

export const fakeLoginStyles = () => css`
	&.fakeLogin {
		position: fixed;
		z-index: 4;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100svh;
		animation: 1s linear show forwards;
	}

	@keyframes show {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;
