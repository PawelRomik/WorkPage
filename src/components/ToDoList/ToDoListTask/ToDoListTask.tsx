import { useMemo } from "react";
import { Task } from "../ToDoList";
import "./ToDoListTask.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";

type toDoListTask = {
	tasks: Task[];
	priorityStyling: (priority: number) => JSX.Element | null;
	startEditing: (index: number) => void;
	showConfirmDialog: (taskId: number, e: React.MouseEvent) => void;
	currentlyEdited: number | null;
};

const ToDoListTask = ({ tasks, priorityStyling, startEditing, showConfirmDialog, currentlyEdited }: toDoListTask) => {
	const { darkMode, color } = useSettingsContext();

	const darkModeStyles = useMemo(
		() => css`
			& .ToDoListTask {
				border: 4px solid ${darkMode ? "#eee" : "rgb(66, 66, 66)"};
				background-color: ${darkMode ? "#eee" : "rgb(66, 66, 66)"};
				color: ${darkMode ? "black" : "white"};

				&.taskEdited {
					border: 4px solid ${color};
					background-color: ${color};
					color: white;
					.taskPriorityParagraph {
						color: white;
					}

					.taskOptions button {
						&:hover,
						&:active {
							background-color: white;
							color: ${color};
							border: 4px solid white;
						}
					}
				}

				.taskPriorityParagraph {
					color: ${color};
				}

				.taskOptions button {
					border: 4px solid ${darkMode ? "#e7e4e4" : "rgb(51, 51, 51)"};
					background-color: ${darkMode ? "#e7e4e4" : "rgb(51, 51, 51)"};
					color: ${darkMode ? "black" : "white"};

					&:focus,
					&:hover {
						background-color: ${color};
						border: 4px solid ${color};
						color: white;
					}
				}
			}
		`,
		[darkMode, color]
	);

	const taskElements = useMemo(
		() =>
			tasks.map((task, id) => (
				<div className={`ToDoListTask ${currentlyEdited === id && "taskEdited"}`} key={id}>
					<section className='taskContent'>
						<h2 title={task.taskName}>Title: {task.taskName} </h2>
						{task.taskContent && <p title={task.taskContent}>{`Description: ${task.taskContent}`}</p>}
						<p>
							Priority: <span className='taskPriorityParagraph'>{priorityStyling(task.taskPriority)}</span>
						</p>
					</section>
					<section className='taskOptions'>
						<button onClick={() => startEditing(id)}>
							<i className='fa-solid fa-pen'></i>
						</button>
						<button onClick={(e) => showConfirmDialog(id, e)}>
							<i className='fa-solid fa-trash'></i>
						</button>
					</section>
				</div>
			)),
		[priorityStyling, showConfirmDialog, startEditing, tasks, currentlyEdited]
	);
	return (
		<section className='ToDoListTasksContainer' css={darkModeStyles}>
			{taskElements.length ? taskElements : <p className='toDoInfo'>No tasks found, create a new one.</p>}
		</section>
	);
};

export default ToDoListTask;
