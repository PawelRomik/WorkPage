import { css } from "@emotion/react";

export const translatorLanguagesStyles = (darkMode: boolean, color: string) => css`
	&.translatorLanguagesSelect {
		font-size: 1rem;
		padding: 0.25rem 0.5rem;
		height: 2rem;
		outline: none;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		border: 4px solid ${darkMode ? "white" : "black"};
		&:focus {
			border: 4px solid ${color};
		}
	}

	@media (min-width: 768px) {
		&.translatorLanguagesSelect {
			height: 3rem;
			font-size: 1.5rem;
		}
	}
`;
