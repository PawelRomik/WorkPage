import { css } from "@emotion/react";
export const customWallpaperStyles = (darkMode: boolean, color: string) => css`
	&.wallpaperPanel {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 2;

		& .wallpaperInput {
			padding: 0.75rem 1.5rem;
			border-right: none;
			border-radius: 30px 0 0 30px;
			outline: none;
			transition: 0.1s;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};

			&:focus {
				border: 2px solid ${color} !important;
				border-right: none !important;

				& ~ .wallpaperConfirmButton {
					border: 2px solid ${color} !important;
					border-left: none !important;
				}
			}
		}

		& .wallpaperConfirmButton {
			transition: 0.1s;
			padding: 0.75rem 1.5rem;
			border-left: none;
			border-radius: 0 30px 30px 0;
			outline: none;
			cursor: pointer;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border: 2px solid ${darkMode ? "white" : "black"};
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		&.wallpaperPanel {
			& .wallpaperInput,
			& .wallpaperConfirmButton {
				font-size: 1.5rem;
			}
		}
	}
`;
