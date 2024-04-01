import { css } from "@emotion/react";

export const loginStyles = (background: string, wallpaperStyle: string) => css`
	&.loginScreen {
		position: relative;
		width: 100vw;
		height: 100svh;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background: linear-gradient(180deg, rgba(24, 24, 24, 0.2) 0%, black 100%);

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: black;
			filter: grayscale(90%);
			margin: 0;
			z-index: -1;
			background-image: url(${background});
			background-size: ${wallpaperStyle};
			animation: slideAnimation 200s linear infinite;
		}

		& .loginTimer {
			position: absolute;
			bottom: 0;
			left: 0;
			margin: 1rem;
			font-size: 3rem;
			color: white;
			user-select: none;
		}
	}

	@keyframes slideAnimation {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 50% 50%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
`;
