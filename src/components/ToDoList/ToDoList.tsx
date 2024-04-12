import { useCallback, useEffect, useState } from "react";
import ToDoListAddTask from "./ToDoListAddTask/ToDoListAddTask";
import ToDoListTask from "./ToDoListTask/ToDoListTask";
import { useSettingsContext } from "../../providers/SettingsContext";
import LocalStorageNames from "../../utils/localstorageNames";
import { todolistContainerStyles } from "./ToDoList.styles";

export type Task = {
	taskName: string;
	taskContent: string;
	taskPriority: number;
};

const { localToDoListTasks } = LocalStorageNames;

const ToDoList = () => {
	const { darkMode } = useSettingsContext();
	const [tasks, changeTasks] = useState<Task[]>([]);
	const [inputValues, changeInputValues] = useState<Task>({ taskName: "", taskContent: "", taskPriority: 1 });
	const [allowEdit, changeAllowEdit] = useState(false);
	const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);

	const addNewTask = useCallback(() => {
		const { taskName, taskContent, taskPriority } = inputValues;

		if (taskName) {
			const newTask: Task = {
				taskName,
				taskContent,
				taskPriority,
			};

			const arr = [...tasks, newTask];
			arr.sort((a, b) => b.taskPriority - a.taskPriority);

			changeTasks(arr);
			changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	}, [tasks, inputValues]);

	const removeTask = useCallback(
		(id: number) => {
			const updatedTasks = [...tasks];
			updatedTasks.splice(id, 1);
			changeTasks(updatedTasks);
			setCurrentlyEdited(null);
			changeAllowEdit(false);
			changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		},
		[tasks]
	);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		changeInputValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}, []);

	const handlePriorityChange = useCallback((value: number) => {
		changeInputValues((prevValues) => ({
			...prevValues,
			taskPriority: value,
		}));
	}, []);

	const priorityStyling = useCallback((taskPriority: number) => {
		const priority = Number(taskPriority);
		switch (priority) {
			case 1:
				return (
					<span>
						<i className='fa-solid fa-star'></i>
					</span>
				);
			case 2:
				return (
					<span>
						<i className='fa-solid fa-star'></i>
						<i className='fa-solid fa-star'></i>
					</span>
				);
			case 3:
				return (
					<span>
						<i className='fa-solid fa-star'></i>
						<i className='fa-solid fa-star'></i>
						<i className='fa-solid fa-star'></i>
					</span>
				);
			default:
				return null;
		}
	}, []);

	const startEditing = useCallback(
		(index: number) => {
			if (currentlyEdited !== index) {
				setCurrentlyEdited(index);
				const taskToEdit = tasks[index];
				changeInputValues({
					taskName: taskToEdit.taskName,
					taskContent: taskToEdit.taskContent,
					taskPriority: taskToEdit.taskPriority,
				});
				changeAllowEdit(true);
			} else {
				setCurrentlyEdited(null);
				changeAllowEdit(false);
				changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
			}
		},
		[tasks, currentlyEdited]
	);

	const finishEditing = useCallback(() => {
		const { taskName, taskContent, taskPriority } = inputValues;
		if (taskName && currentlyEdited !== null) {
			const updatedTasks = [...tasks];
			updatedTasks[currentlyEdited] = {
				taskName,
				taskContent,
				taskPriority,
			};
			updatedTasks.sort((a, b) => b.taskPriority - a.taskPriority);
			changeTasks(updatedTasks);
			setCurrentlyEdited(null);
			changeAllowEdit(false);
			changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	}, [currentlyEdited, tasks, inputValues]);

	const closeEdit = useCallback(() => {
		changeAllowEdit(false);
		setCurrentlyEdited(null);
		changeInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
	}, []);

	useEffect(() => {
		const storedTasks = localStorage.getItem(localToDoListTasks);
		if (storedTasks) {
			const parsedTasks: Task[] = JSON.parse(storedTasks);
			changeTasks(parsedTasks);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(localToDoListTasks, JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className='ToDoListContainer' css={todolistContainerStyles(darkMode)}>
			<ToDoListTask currentlyEdited={currentlyEdited} tasks={tasks} startEditing={startEditing} priorityStyling={priorityStyling} removeTask={removeTask} />
			<ToDoListAddTask
				allowEdit={allowEdit}
				handlePriorityChange={handlePriorityChange}
				changeAllowEdit={changeAllowEdit}
				inputValues={inputValues}
				handleInputChange={handleInputChange}
				addNewTask={addNewTask}
				finishEditing={finishEditing}
				currentlyEdited={currentlyEdited}
				closeEdit={closeEdit}
			/>
		</div>
	);
};

export default ToDoList;
