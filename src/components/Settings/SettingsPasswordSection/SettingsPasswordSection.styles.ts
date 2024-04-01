import { css } from "@emotion/react";

export const settingsPasswordSectionStyles = (darkMode: boolean) => css`
	&.changePasswordSection {
		display: flex;
		justify-content: center;
		gap: 10%;
		align-items: center;
		flex-direction: column;
		min-height: 40%;
		width: 100%;
		border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;

		& .swal2-html-container {
			overflow: hidden !important;
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
			flex-direction: column !important;
			width: 100% !important;
			margin: 1rem 0 0 00 !important;

			div {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				gap: 1rem;
				label {
					margin: 1rem 0 0 0;
				}
				input {
					margin: 0;
				}
			}
		}

		& .swal2-validation-message {
			opacity: 0;
			width: 0 !important;
			margin: 0 !important;
			padding: 0 !important;
			height: 0 !important;
		}

		& .usersDataContainer {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column-reverse;
			gap: 1rem;
		}
	}

	@media (min-width: 768px) {
		&.changePasswordSection {
			& h2 {
				font-size: 2.25rem;
			}

			& .usersDataContainer {
				gap: 1rem;
			}
		}
	}
`;
