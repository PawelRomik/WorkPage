import { css } from "@emotion/react";
export const settingsWallpaperSectionStyles = () => css`
	&.changeWallpaperSection {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex: 1;
		min-height: 70%;
		gap: 10%;

		& .wallpaperSectionSettings {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			height: 70%;
			width: 100%;
			gap: 5%;
		}
	}

	@media (min-width: 768px) {
		&.changeWallpaperSection h2 {
			font-size: 2.25rem;
		}
	}
`;

export const wallpaperSelectionStyles = (darkMode: boolean) => css`
	&.wallpapersSelection {
		width: 100%;
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		& button {
			border: 2px solid ${darkMode ? "white" : "black"};
		}

		& button {
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			background-color: transparent;
			& img {
				flex: 1;
				width: 100%;
			}
		}
	}
	@media (min-width: 1200px) {
		&.wallpapersSelection {
			width: 60%;
		}
	}
`;
