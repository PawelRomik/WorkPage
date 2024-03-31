import { css } from "@emotion/react";

export const logoutButtonStyles = (darkMode: boolean, color: string) => css`
	&.logoutButton {
		border: 2px solid white;
		outline: none;
		transition: 0.2s;
		border-right: 2px solid white;
		border-radius: 30px;
		padding: 0.4rem 0.6rem;
		font-size: 0.7rem;
		cursor: pointer;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		border-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
		&:hover,
		&:focus {
			color: white !important;
			background-color: ${color} !important;
		}
	}

	@media (min-width: 768px) {
		&.logoutButton {
			padding: 0.5rem 1.25rem;
			font-size: 0.7rem;
		}
	}
`;
