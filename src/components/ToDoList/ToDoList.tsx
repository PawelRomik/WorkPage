import { useCallback, useEffect, useMemo, useState } from "react";
import "./ToDoList.style.scss";
import ToDoListAddTask from "./ToDoListAddTask/ToDoListAddTask";
import ToDoListTask from "./ToDoListTask/ToDoListTask";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";
import LocalStorageNames from "../../utils/localstorageNames";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export type Task = {
	taskName: string;
	taskContent: string;
	taskPriority: number;
};

const ToDoList = () => {
	const { darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const [tasks, changeTasks] = useState<Task[]>([]);
	const [inputValues, changeInputValues] = useState<Task>({ taskName: "", taskContent: "", taskPriority: 1 });
	const [allowEdit, changeAllowEdit] = useState(false);
	const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
	const { localToDoListTasks } = useMemo(() => LocalStorageNames, []);

	const darkModeStyles = useMemo(
		() => css`
			&.ToDoListContainer {
				background-color: ${darkMode ? "lightgray" : "rgb(31, 30, 30)"};
			}
		`,
		[darkMode]
	);

	useEffect(() => {
		const storedTasks = localStorage.getItem(localToDoListTasks);
		if (storedTasks) {
			const parsedTasks: Task[] = JSON.parse(storedTasks);
			changeTasks(parsedTasks);
		}
	}, [localToDoListTasks]);

	useEffect(() => {
		localStorage.setItem(localToDoListTasks, JSON.stringify(tasks));
	}, [tasks, localToDoListTasks]);

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

	const showConfirmDialog = useCallback(
		(taskId: number, e: React.MouseEvent) => {
			e.stopPropagation();
			withReactContent(Swal)
				.fire({
					title: t("Swal.swalTitle"),
					text: t("Swal.swalDesc"),
					showCancelButton: true,
					confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					confirmButtonText: t("Swal.swalYes"),
					cancelButtonText: t("Swal.swalNo"),
					background: darkMode ? "white" : "black",
					color: darkMode ? "black" : "white",
					showCloseButton: true,
					target: ".ToDoListContainer",
				})
				.then((result) => {
					if (result.isConfirmed) {
						removeTask(taskId);
						toast.success(t("ToDoList.toastRemovedTask"));
					}
				});
		},
		[removeTask, darkMode, t]
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
			setCurrentlyEdited(index);
			const taskToEdit = tasks[index];
			changeInputValues({
				taskName: taskToEdit.taskName,
				taskContent: taskToEdit.taskContent,
				taskPriority: taskToEdit.taskPriority,
			});
			changeAllowEdit(true);
		},
		[tasks]
	);

	const finishEditing = useCallback(() => {
		const { taskName, taskContent, taskPriority } = inputValues;
		if (taskName && taskContent && currentlyEdited !== null) {
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

	return (
		<div className='ToDoListContainer' css={darkModeStyles}>
			<ToDoListTask currentlyEdited={currentlyEdited} tasks={tasks} startEditing={startEditing} priorityStyling={priorityStyling} showConfirmDialog={showConfirmDialog} />
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
