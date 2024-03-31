import { css } from "@emotion/react";

export const taskbarRightContainerStyles = (darkMode: boolean, color: string) => css`
	&.rightTaskbarContainer {
		display: flex;
		gap: 0.75rem;
		color: ${darkMode ? "black" : "white"};

		& > i {
			cursor: pointer;
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		}

		& .taskbarTimer {
			margin-right: 0.5rem;
			cursor: pointer;
			color: ${darkMode ? "black" : "white"};
		}
	}

	@media (min-width: 768px) {
		&.rightTaskbarContainer {
			font-size: 1.25rem;
			gap: 1rem;
		}
	}
`;
