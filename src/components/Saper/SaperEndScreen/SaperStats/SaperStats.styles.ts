import { css } from "@emotion/react";

export const saperStatsStyles = (darkMode: boolean) => css`
	&.saperStats {
		display: none;
	}

	@media (min-width: 1200px) {
		&.saperStats {
			display: flex;
			justify-content: space-around;
			align-items: flex-start;
			flex-direction: column;
			width: 80%;
			height: 30%;
			padding: 1rem;
			background-color: ${darkMode ? "white" : "black"};
			border-radius: 20px;
			color: ${darkMode ? "black" : "white"};
		}
	}
`;
