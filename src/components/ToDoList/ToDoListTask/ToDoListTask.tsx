import { useMemo } from "react";
import { Task } from "../ToDoList";
import "./ToDoListTask.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";

type toDoListTask = {
	tasks: Task[];
	priorityStyling: (priority: number) => JSX.Element | null;
	startEditing: (index: number) => void;
	removeTask: (index: number) => void;
};

const ToDoListTask = ({ tasks, priorityStyling, startEditing, removeTask }: toDoListTask) => {
	const { darkMode } = useSettingsContext();

	const darkModeStyles = useMemo(
		() => css`
			& .ToDoListTask {
				border-bottom: 2px solid ${darkMode ? "white" : "black"};
				background-color: ${darkMode ? "lightgray" : "rgb(66, 66, 66)"};
				color: ${darkMode ? "black" : "white"};

				.taskOptions button {
					border: 2px solid ${darkMode ? "white" : "black"};
					background-color: ${darkMode ? "#e7e4e4" : "rgb(51, 51, 51)"};
					color: ${darkMode ? "black" : "white"};

					&:focus,
					&:hover {
						background-color: ${darkMode ? "white" : "black"};
						color: ${darkMode ? "black" : "white"};
					}
				}
			}
		`,
		[darkMode]
	);

	const taskElements = useMemo(
		() =>
			tasks.map((task, id) => (
				<div className='ToDoListTask' key={id}>
					<section className='taskContent'>
						<h2>Title: {task.taskName}</h2>
						{task.taskContent && <p>{`Description: ${task.taskContent}`}</p>}
						<p>Priority: {priorityStyling(task.taskPriority)}</p>
					</section>
					<section className='taskOptions'>
						<button onClick={() => startEditing(id)}>
							<i className='fa-solid fa-pen'></i>
						</button>
						<button onClick={() => removeTask(id)}>
							<i className='fa-solid fa-trash'></i>
						</button>
					</section>
				</div>
			)),
		[priorityStyling, removeTask, startEditing, tasks]
	);
	return (
		<section className='ToDoListTasksContainer' css={darkModeStyles}>
			{taskElements.length ? taskElements : <p className='toDoInfo'>No tasks found, create a new one.</p>}
		</section>
	);
};

export default ToDoListTask;
