import { css } from "@emotion/react";

export const currentDateSectionStyles = (darkMode: boolean, color: string) => css`
	&.currentDateSection {
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		flex: 1;
	}

	&.currentDateSection .clockValue {
		color: ${darkMode ? "black" : "white"};
		font-size: 3rem;
	}

	&.currentDateSection .currentDate {
		color: ${color};
	}
`;
