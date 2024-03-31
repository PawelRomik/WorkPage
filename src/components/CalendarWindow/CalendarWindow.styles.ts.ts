import { css } from "@emotion/react";

export const calendarContainerStyles = (darkMode: boolean) => css`
	&.calendarContainer {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 70%;
		height: 450px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		z-index: 3;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
	}

	@media (min-width: 768px) {
		&.calendarContainer {
			height: 450px;
			width: auto;
		}
	}
`;
