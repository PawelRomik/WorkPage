import { css } from "@emotion/react";

export const todolistTaskStyles = (darkMode: boolean, color: string) => css`
	&.ToDoListTasksContainer {
		position: relative;
		width: 100%;
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		overflow: auto;
		align-items: flex-start;
		padding: 0.5rem;
		gap: 0.5rem;

		scrollbar-color: black;
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			margin: 5px;
			width: 8px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: black;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		& .toDoInfo {
			font-weight: bold;
			text-align: center;
			width: 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			color: ${darkMode ? "black" : "white"};
		}

		& .ToDoListTask {
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding: 0.25rem;
			justify-content: space-between;
			align-items: center;
			border: 4px solid ${darkMode ? "white" : "black"};
			background-color: ${darkMode ? "white" : "black"};
			color: ${darkMode ? "black" : "white"};

			&.taskEdited {
				border: 4px solid ${color};
				background-color: ${color};
				color: white;
				.taskPriorityParagraph {
					color: white;
				}

				.taskOptions button {
					&:first-of-type {
						background-color: white;
						color: ${color};
						border: 4px solid white;
					}
					&:hover,
					&:focus {
						background-color: white;
						color: ${color};
						border: 4px solid white;
					}
				}
			}

			& .taskPriorityParagraph {
				color: ${color};
			}

			& .taskOptions {
				justify-content: flex-end;
				align-items: center;
				display: flex;
				gap: 5%;
				margin: 0.25rem 0.25rem 0.25rem 2rem;

				& button {
					cursor: pointer;
					padding: 0.25rem;
					width: 3rem;
					height: 3rem;
					background-color: rgb(51, 51, 51);
					color: white;
					transition: 0.1s;
					border: 4px solid ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};
					background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};
					color: ${darkMode ? "black" : "white"};

					&:focus,
					&:hover {
						background-color: ${color};
						border: 4px solid ${color};
						color: white;
					}
				}
			}

			& .taskContent {
				max-width: 90%;
				flex: 1;
				text-overflow: ellipsis;

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
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin: 0.25rem;
				}
			}
		}
	}

	@media (min-width: 768px) {
		& .toDoInfo {
			font-size: 2rem;
		}
	}
`;
