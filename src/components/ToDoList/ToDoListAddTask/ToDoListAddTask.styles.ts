import { css } from "@emotion/react";

export const todolistAddTaskStyles = (darkMode: boolean, color: string) => css`
	&.ToDoListAddTask {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		background-color: ${darkMode ? "white" : "black"};
		border: 2px solid ${darkMode ? "white" : "black"};

		& label {
			color: ${darkMode ? "black" : "white"};
		}

		& .ToDoListButton {
			padding: 0.55rem 2rem;
			margin: 0.5rem;
			border-radius: 100px;
			transition: 0.2s;
			cursor: pointer;
			border: 2px solid ${darkMode ? "black" : "white"};
			background-color: ${darkMode ? "white" : "black"};
			opacity: 0.5;
			color: gray;

			&:not(:disabled) {
				opacity: 1;
				color: ${darkMode ? "black" : "white"};
			}

			&:not(:disabled):focus,
			&:not(:disabled):hover {
				background-color: ${color} !important;
				color: white !important;
			}

			&:disabled {
				cursor: default;
			}
		}

		& .starButton {
			cursor: pointer;
			width: 2rem;
			height: 2rem;
			font-size: 1.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			border: none;
			color: ${darkMode ? "black" : "white"};
			&.starActive {
				color: ${color};
			}
		}

		& .ToDoListInputWrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			flex-direction: column;
			padding: 0.15rem;

			& p {
				color: ${color};
			}

			& .taskContent {
				max-width: 90%;
				overflow-x: auto;
				flex: 1;

				scrollbar-color: black;
				scrollbar-width: thin;

				&::-webkit-scrollbar {
					margin: 5px;
					width: 8px;
					height: 8px;
				}

				&::-webkit-scrollbar-thumb {
					background-color: rgb(150, 150, 150);
				}

				&::-webkit-scrollbar-track {
					background-color: rgb(212, 212, 212);
				}

				& p,
				& h2 {
					max-width: 100%;
					text-overflow: ellipsis;
				}
			}

			& .ToDoListRadioButtons {
				width: 40%;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			& .ToDoListInput {
				border: 2px solid ${darkMode ? "black" : "white"};
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				padding: 0.45rem;
				margin: 0.15rem;
				width: 60%;
				outline: none;
				transition: 0.1s;
				border-radius: 100px;

				&:focus {
					border: 2px solid ${color} !important;
				}
			}

			& p {
				font-size: 0.75rem;
			}
		}

		& .hideEditBtn {
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};
			position: absolute;
			top: 0;
			right: 0;
			font-weight: bold;
			border: none;
			width: 2rem;
			height: 2rem;
			cursor: pointer;
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		}
	}

	@media (min-width: 768px) {
		&.ToDoListAddTask {
			& label {
				font-size: 1.25rem;
				margin: 0.55rem;
			}

			& .ToDoListButton {
				padding: 0.75rem 6rem;
				font-size: 1.25rem;
			}

			& .hideEditBtn {
				font-size: 1rem;
			}

			& .ToDoListInputWrapper {
				& .ToDoListInput {
					padding: 0.55rem;
					margin: 0.25rem;
					width: 30%;
					outline: none;
					font-size: 1.25rem;
					transition: 0.1s;
					border-radius: 100px;
				}
				& .ToDoListRadioButtons {
					width: 8%;
					justify-content: space-around;
				}
				& p {
					font-size: 1rem;
				}
			}
		}
	}
`;

export const allowEditButtonStyles = (darkMode: boolean, color: string) => css`
	&.allowEditBtn {
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};
		border: 2px solid ${darkMode ? "white" : "black"};
		width: 100%;
		font-size: 1.5rem;
		height: 4rem;
		cursor: pointer;
		&:focus,
		&:hover {
			color: ${color} !important;
		}
	}

	@media (min-width: 768px) {
		&.allowEditBtn {
			font-size: 2.5rem;
		}
	}
`;
