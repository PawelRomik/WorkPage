import { css } from "@emotion/react";

export const saperContainerStyles = (darkMode: boolean) => css`
	&.saperContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
	}

	@media (min-width: 768px) {
		&.saperContainer {
			font-size: 2rem;
		}
	}

	@media (min-width: 1200px) {
		&.saperContainer {
			justify-content: flex-end;
			flex-direction: row;
		}
	}
`;
