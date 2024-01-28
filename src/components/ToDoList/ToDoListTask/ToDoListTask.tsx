import { useMemo } from "react";
import { Task } from "../ToDoList";
import "./ToDoListTask.style.scss";

type toDoListTask = {
	tasks: Task[];
	priorityStyling: (priority: number) => JSX.Element | null;
	startEditing: (index: number) => void;
	removeTask: (index: number) => void;
};

const ToDoListTask = ({ tasks, priorityStyling, startEditing, removeTask }: toDoListTask) => {
	const taskElements = useMemo(
		() =>
			tasks.map((task, id) => (
				<div className='ToDoListTask' key={id}>
					<section className='taskContent'>
						<h2>Title: {task.taskName}</h2>
						<p>{`Desc: ${task.taskContent}`}</p>
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
	return <section className='ToDoListTasksContainer'>{taskElements.length ? taskElements : <p className='toDoInfo'>No tasks found, create a new one.</p>}</section>;
};

export default ToDoListTask;
