import { css } from "@emotion/react";

export const taskbarCenterAppStyles = (darkMode: boolean, color: string) => css`
	&.taskbarCenterApp {
		background-color: transparent;
		border-bottom: 2px solid white;
		font-size: 1.25rem;
		width: 2rem;
		display: flex;
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
		justify-content: center;
		align-items: center;
		height: 2rem;
		margin-left: 0.5rem;
		cursor: pointer;
		outline: none;
		color: ${darkMode ? "black" : "white"};
		border-bottom: 2px solid ${color};

		&:hover,
		&:focus {
			background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
			& i::after {
				color: ${color};
				width: 3rem;
				height: 3rem;
				display: flex;
				justify-content: center;
				align-items: center;
				content: "x";
				z-index: 3;
				font-weight: bold;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		i {
			position: relative;
		}
	}

	@media (min-width: 768px) {
		&.taskbarCenterApp {
			height: 3rem;
			width: 3rem;
			font-size: 1.5rem;
		}
	}
`;
