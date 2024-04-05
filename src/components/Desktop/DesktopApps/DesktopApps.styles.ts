import { css } from "@emotion/react";

export const desktopAppsContainerStyles = () => css`
	&.desktopAppsContainer {
		width: 100%;
		display: flex;
		justify-content: space-between;

		& .leftApps {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			gap: 1.5rem;
			justify-content: flex-start;
			flex-wrap: wrap;
			height: 35rem;
		}

		& .rightApps {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			justify-content: space-between;
			gap: 1.5rem;
		}
	}

	@media (min-width: 768px) {
		&.desktopAppsContainer {
			& .leftApps {
				margin: 2rem;
				gap: 3rem;
				height: 51rem;
			}

			& .rightApps {
				margin: 2rem;
				gap: 3rem;
			}
		}
	}
`;
