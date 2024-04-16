import { useCallback, useEffect, useState } from "react";
import { ToDoListAddTask } from "./ToDoListAddTask/ToDoListAddTask";
import { ToDoListTask } from "./ToDoListTask/ToDoListTask";
import { useSettingsContext } from "../../providers/SettingsContext";
import { LocalStorageNames } from "../../utils/localstorageNames";
import { todolistContainerStyles } from "./ToDoList.styles";

export type Task = {
	taskName: string;
	taskContent: string;
	taskPriority: number;
};

const { localToDoListTasks } = LocalStorageNames;

export const ToDoList = () => {
	const { darkMode } = useSettingsContext();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [inputValues, setInputValues] = useState<Task>({ taskName: "", taskContent: "", taskPriority: 1 });
	const [allowEdit, setAllowEdit] = useState(false);
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

			setTasks(arr);
			setInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	}, [tasks, inputValues]);

	const removeTask = useCallback(
		(id: number) => {
			const updatedTasks = [...tasks];
			updatedTasks.splice(id, 1);
			setTasks(updatedTasks);
			setCurrentlyEdited(null);
			setAllowEdit(false);
			setInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		},
		[tasks]
	);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}, []);

	const handlePriorityChange = useCallback((value: number) => {
		setInputValues((prevValues) => ({
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
				setInputValues({
					taskName: taskToEdit.taskName,
					taskContent: taskToEdit.taskContent,
					taskPriority: taskToEdit.taskPriority,
				});
				setAllowEdit(true);
			} else {
				setCurrentlyEdited(null);
				setAllowEdit(false);
				setInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
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
			setTasks(updatedTasks);
			setCurrentlyEdited(null);
			setAllowEdit(false);
			setInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
		}
	}, [currentlyEdited, tasks, inputValues]);

	const closeEdit = useCallback(() => {
		setAllowEdit(false);
		setCurrentlyEdited(null);
		setInputValues({ taskName: "", taskContent: "", taskPriority: 1 });
	}, []);

	useEffect(() => {
		const storedTasks = localStorage.getItem(localToDoListTasks);
		if (storedTasks) {
			const parsedTasks: Task[] = JSON.parse(storedTasks);
			setTasks(parsedTasks);
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
				setAllowEdit={setAllowEdit}
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
