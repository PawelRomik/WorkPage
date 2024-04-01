import { css } from "@emotion/react";

export const todolistContainerStyles = (darkMode: boolean) => css`
	&.ToDoListContainer {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		background-color: ${darkMode ? "lightgray" : "rgb(31, 30, 30)"};
	}
`;
