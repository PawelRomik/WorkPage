import { css } from "@emotion/react";

export const taskbarSystemButtonStyles = (darkMode: boolean, color: string) => css`
	&.systemButton {
		background-color: transparent;
		border: none;
		font-size: 1.25rem;
		margin-left: 0.5rem;
		cursor: pointer;
		outline: none;
		color: ${darkMode ? "black" : "white"};

		&:focus,
		&:hover {
			color: ${color} !important;
		}
	}
	@media (min-width: 768px) {
		&.systemButton {
			font-size: 1.75rem;
		}
	}
`;
