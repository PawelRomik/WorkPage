import { css } from "@emotion/react";

export const desktopStyles = (background: string, wallpaperStyle: string) => css`
	&.desktop {
		flex: 1;
		background-position: 75%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		flex-direction: column;
		background-image: url(${background});
		background-size: ${wallpaperStyle};
	}
`;

export const appWrapperStyles = () => css`
	&.appWrapper {
		width: 100%;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		max-width: 1920px;
	}
`;
