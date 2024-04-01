import { css } from "@emotion/react";

export const wallpaperStylesStyles = (darkMode: boolean, color: string) => css`
	&.wallpapersStyle {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 1rem;
		flex: 1;
		& .wallpapersStyleButton {
			width: 4.5rem;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 30px;
			cursor: pointer;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};

			&:focus,
			&:hover {
				background-color: ${color} !important;
				color: white;
			}

			&.chosenWallpaperStyle {
				background-color: ${color};
				color: white;
				border-color: ${color};
			}
		}
	}
`;
