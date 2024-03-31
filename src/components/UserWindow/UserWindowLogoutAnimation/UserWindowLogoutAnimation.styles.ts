import { css } from "@emotion/react";

export const logoutAnimation = () => css`
	&.logOutAnimation {
		position: fixed;
		top: 0;
		z-index: 4;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: black;
		opacity: 0;
		animation: show2 1s linear forwards;
	}

	@keyframes show2 {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
