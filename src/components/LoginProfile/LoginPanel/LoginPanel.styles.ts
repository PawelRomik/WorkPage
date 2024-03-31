import { css } from "@emotion/react";

export const loginPanelStyles = () => css`
	&.loginPanel {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const loginButtonStyles = (darkMode: boolean, color: string) => css`
	& .loginButtons {
		& .loginJoinButton {
			padding: 0.75rem 1.5rem;
			border: 2px solid white;
			border-right: none;
			border-radius: 30px 0 0 30px;
			outline: none;
			transition: 0.2s;
			cursor: pointer;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
		}

		& .signInButton {
			transition: 0.1s;

			padding: 0.75rem 1.5rem;
			border: 2px solid white;
			border-left: none;
			border-radius: 0 30px 30px 0;
			outline: none;
			cursor: pointer;
			transition: 0.2s;
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			border-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
		}

		&:hover,
		&:focus {
			& .loginJoinButton,
			& .signInButton {
				color: white !important;
				background-color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		& .signInButton,
		& .loginJoinButton {
			font-size: 1.25rem;
		}
	}
`;
