import { css } from "@emotion/react";
export const SettingsUsersDataLeftStyles = (darkMode: boolean, color: string) => css`
	&.usersDataLeft {
		display: flex;
		justify-content: center;
		align-items: space-between;
		flex-direction: column;
		gap: 0.5rem;

		& .usersDataBox {
			display: flex;
			justify-content: space-between;
			gap: 1.5rem;
			align-items: center;

			& .usersUsername {
				color: ${color};
				font-weight: bold;
			}

			& button {
				width: 4rem;
				border-radius: 10px;
				padding: 0.1rem 0.1rem;
				cursor: pointer;
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 2px solid ${darkMode ? "black" : "white"};

				&:hover,
				&:active {
					background-color: ${color};
					color: white;
				}
			}
		}
	}

	@media (min-width: 768px) {
		&.usersDataLeft .usersDataBox {
			display: flex;
			justify-content: space-between;
			gap: 1.5rem;
			align-items: center;

			button {
				width: 5rem;
				height: 1.5rem;
			}
		}
	}
`;
