import { css } from "@emotion/react";

export const saperCenterStyles = (darkMode: boolean) => css`
	&.saperCenter {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		text-align: center;

		& .saperTitle {
			width: 100%;
			background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};
			padding: 0.5rem;
		}
	}

	@media (min-width: 1200px) {
		&.saperCenter {
			text-align: center;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			border-left: 3px solid gray;

			& .saperTitle {
				border-bottom: 3px solid gray;
			}
		}
	}
`;
