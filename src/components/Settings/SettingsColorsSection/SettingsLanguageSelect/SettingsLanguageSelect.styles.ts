import { css } from "@emotion/react";

export const settingsLanguageSelectStyles = (darkMode: boolean) => css`
	&.settingsLanguageSelect {
		font-size: 1rem;
		padding: 0.25rem 0.5rem;
		border-radius: 20px;
		height: 2rem;
		outline: none;
		width: 5.5rem;

		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;

		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 5px;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		border: 2px solid ${darkMode ? "white" : "black"};
		background-image: url("data:image/svg+xml;utf8,<svg fill='${darkMode
			? "black"
			: "white"}' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
	}
`;
