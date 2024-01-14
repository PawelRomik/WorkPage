import { useEffect, useState } from "react";
import "./ToDoList.style.scss";

interface Task {
	taskName: string;
	taskContent: string;
	taskPriority: number;
}

const ToDoList = () => {
	const [tasks, changeTasks] = useState<Task[]>([]);
	const [inputValues, changeInputValues] = useState<Task>({ taskName: "", taskContent: "", taskPriority: 1 });
	const [allowEdit, changeAllowEdit] = useState(false);
	const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			const parsedTasks: Task[] = JSON.parse(storedTasks);
			changeTasks(parsedTasks);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const addNewTask = () => {
		if (inputValues.taskName && inputValues.taskContent) {
			const newTask: Task = {
				taskName: inputValues.taskName,
				taskContent: inputValues.taskContent,
				taskPriority: inputValues.taskPriority,
			};

			const arr = [...tasks, newTask];
			arr.sort((a, b) => b.taskPriority - a.taskPriority);

			changeTasks(arr);
			changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	};

	const removeTask = (i: number) => {
		const updatedTasks = [...tasks];
		updatedTasks.splice(i, 1);
		changeTasks(updatedTasks);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		changeInputValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const priorityStyling = (priority: number) => {
		const stars = [];

		for (let i = 0; i < priority; i++) {
			stars.push(<i key={i} className='fa-solid fa-star'></i>);
		}
		return <span>{stars}</span>;
	};

	const startEditing = (index: number) => {
		setCurrentlyEdited(index);
		const taskToEdit = tasks[index];
		changeInputValues({
			taskName: taskToEdit.taskName,
			taskContent: taskToEdit.taskContent,
			taskPriority: taskToEdit.taskPriority,
		});
		changeAllowEdit(true);
	};

	const finishEditing = () => {
		if (inputValues.taskName && inputValues.taskContent && currentlyEdited !== null) {
			const updatedTasks = [...tasks];
			updatedTasks[currentlyEdited] = {
				taskName: inputValues.taskName,
				taskContent: inputValues.taskContent,
				taskPriority: inputValues.taskPriority,
			};
			updatedTasks.sort((a, b) => b.taskPriority - a.taskPriority);
			changeTasks(updatedTasks);
			setCurrentlyEdited(null);
			changeAllowEdit(false);
			changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	};

	const closeEdit = () => {
		changeAllowEdit(false);
		setCurrentlyEdited(null);
		changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
	};

	const taskElements = tasks.map((task, i) => (
		<div className='ToDoListTask' key={i}>
			<section className='taskContent'>
				<h2>Title: {task.taskName}</h2>
				<p>{`Desc: ${task.taskContent}`}</p>
				<p>Priority: {priorityStyling(task.taskPriority)}</p>
			</section>
			<section className='taskOptions'>
				<button onClick={() => startEditing(i)}>
					<i className='fa-solid fa-pen'></i>
				</button>
				<button onClick={() => removeTask(i)}>
					<i className='fa-solid fa-trash'></i>
				</button>
			</section>
		</div>
	));

	return (
		<div className='ToDoListContainer'>
			<section className='ToDoListTasksContainer'>{taskElements}</section>
			<section className='ToDoListAddTask'>
				{allowEdit ? (
					<>
						<button className='hideEditBtn' onClick={closeEdit}>
							X
						</button>
						<div className='ToDoListInputWrapper'>
							<label htmlFor='taskName'>Title:</label>
							<input className='ToDoListInput' type='text' id='taskName' name='taskName' value={inputValues.taskName} onChange={handleInputChange}></input>
						</div>
						<div className='ToDoListInputWrapper'>
							<label htmlFor='taskContent'>Description:</label>
							<input className='ToDoListInput' type='text' id='taskContent' name='taskContent' value={inputValues.taskContent} onChange={handleInputChange}></input>
						</div>
						<div className='ToDoListInputWrapper'>
							<label htmlFor='taskPriority'>Priority (1-3):</label>
							<input
								className='ToDoListInput'
								type='number'
								min='1'
								max='3'
								id='taskPriority'
								value={inputValues.taskPriority}
								name='taskPriority'
								onChange={handleInputChange}
							></input>
						</div>
						{currentlyEdited !== null ? (
							<button className='ToDoListButton' onClick={() => finishEditing()}>
								Finish Editing
							</button>
						) : (
							<button className='ToDoListButton' onClick={addNewTask}>
								Add new task
							</button>
						)}
					</>
				) : (
					<button className='allowEditBtn' onClick={() => changeAllowEdit(true)}>
						+
					</button>
				)}
			</section>
		</div>
	);
};

export default ToDoList;
