import { css } from "@emotion/react";

export const taskbarStyles = (darkMode: boolean) => css`
	&.taskbar {
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		height: 2rem;
		position: relative;
		background-color: ${darkMode ? "white" : "black"};

		& .taskbarWrapper {
			width: 100%;
			max-width: 1920px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
		}
	}

	@media (min-width: 768px) {
		&.taskbar {
			height: 3rem;
		}
	}
`;
