import { css } from "@emotion/react";

export const loginProfileStyles = () => css`
	&.loginProfile {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		gap: 1rem;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
`;

export const avatarStyles = (darkMode: boolean, color: string) => css`
	&.userAvatar {
		width: 10rem;
		height: 10rem;
		border: 6px solid white;
		border-radius: 400px;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border-color: ${darkMode ? "white" : "black"};
		background: linear-gradient(200deg, ${color} 0%, black 100%);
	}

	@media (min-width: 768px) {
		&.userAvatar {
			width: 15rem;
			height: 15rem;
		}
	}
`;

export const userNameStyles = () => css`
	&.userName {
		font-size: 2rem;
		font-weight: bold;
	}

	@media (min-width: 768px) {
		&.userName {
			font-size: 2.5rem;
		}
	}
`;
