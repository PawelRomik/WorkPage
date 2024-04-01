import { useMemo, useCallback } from "react";
import { Task } from "../ToDoList";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { todolistTaskStyles } from "./ToDoListTask.styles";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { launchToast } from "../../../utils/toastFunction";

type toDoListTask = {
	tasks: Task[];
	priorityStyling: (priority: number) => JSX.Element | null;
	startEditing: (index: number) => void;
	removeTask: (id: number) => void;
	currentlyEdited: number | null;
};

const ToDoListTask = ({ tasks, priorityStyling, startEditing, removeTask, currentlyEdited }: toDoListTask) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

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
						launchToast("success", t("ToDoList.toastRemovedTask"));
					}
				});
		},
		[removeTask, darkMode, t]
	);

	const taskElements = useMemo(
		() =>
			tasks.map((task, id) => (
				<div className={`ToDoListTask ${currentlyEdited === id && "taskEdited"}`} key={id}>
					<section className='taskContent'>
						<h2 title={task.taskName}>
							{t("ToDoList.toDoListTitle")}: {task.taskName}{" "}
						</h2>
						{task.taskContent && <p title={task.taskContent}>{`${t("ToDoList.toDoListDescription")}: ${task.taskContent}`}</p>}
						<p>
							{t("ToDoList.toDoListPriority")}: <span className='taskPriorityParagraph'>{priorityStyling(task.taskPriority)}</span>
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
		[priorityStyling, t, showConfirmDialog, startEditing, tasks, currentlyEdited]
	);
	return (
		<section className='ToDoListTasksContainer' css={todolistTaskStyles(darkMode, color)}>
			{taskElements.length ? taskElements : <p className='toDoInfo'>{t("ToDoList.toDoListNoTasks")}</p>}
		</section>
	);
};

export default ToDoListTask;
