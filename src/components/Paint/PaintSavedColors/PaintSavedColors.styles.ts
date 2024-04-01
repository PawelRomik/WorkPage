import { css } from "@emotion/react";

export const paintSavedColorsStyles = (darkMode: boolean) => css`
	&.paintSavedColors {
		display: flex;
		padding: 0 0.5rem;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		gap: 0.5rem;
		& .paintSavedColor {
			margin-top: 0.8rem;
			width: 2rem;
			height: 2rem;
			cursor: pointer;
			border: 2px solid ${darkMode ? "white" : "black"};
		}
	}

	@media (min-width: 768px) {
		&.paintSavedColors {
			& .paintSavedColor {
				width: 2.25rem;
				height: 2.25rem;
			}
		}
	}
`;
