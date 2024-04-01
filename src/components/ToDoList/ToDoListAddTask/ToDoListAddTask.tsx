import React from "react";
import { Task } from "../ToDoList";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { allowEditButtonStyles, todolistAddTaskStyles } from "./ToDoListAddTask.styles";

type ToDoListAddTaskProps = {
	allowEdit: boolean;
	changeAllowEdit: React.Dispatch<React.SetStateAction<boolean>>;
	inputValues: Task;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addNewTask: () => void;
	finishEditing: () => void;
	currentlyEdited: number | null;
	closeEdit: () => void;
	handlePriorityChange: (value: number) => void;
};

const ToDoListAddTask = ({
	allowEdit,
	changeAllowEdit,
	handlePriorityChange,
	inputValues,
	handleInputChange,
	addNewTask,
	finishEditing,
	currentlyEdited,
	closeEdit,
}: ToDoListAddTaskProps) => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const disabledButton = useMemo(() => {
		return inputValues.taskName.length < 3;
	}, [inputValues]);

	return (
		<>
			{allowEdit ? (
				<section className='ToDoListAddTask' css={todolistAddTaskStyles(darkMode, color)}>
					<button className='hideEditBtn' onClick={closeEdit}>
						X
					</button>
					<div className='ToDoListInputWrapper'>
						<label htmlFor='taskName'>{t("ToDoList.toDoListTitle")}:</label>
						<p>{t("ToDoList.toDoListTitleReqs")}</p>
						<input className='ToDoListInput' type='text' id='taskName' name='taskName' value={inputValues.taskName} onChange={handleInputChange}></input>
					</div>
					<div className='ToDoListInputWrapper'>
						<label htmlFor='taskContent'>{t("ToDoList.toDoListDescription")}:</label>
						<p>{t("ToDoList.toDoListDescriptionOptional")}</p>
						<input className='ToDoListInput' type='text' id='taskContent' name='taskContent' value={inputValues.taskContent} onChange={handleInputChange}></input>
					</div>
					<div className='ToDoListInputWrapper'>
						<label htmlFor='taskPriority'>{t("ToDoList.toDoListPriority")}:</label>
						<div className='ToDoListRadioButtons'>
							<button className={`starButton ${inputValues.taskPriority >= 1 ? "starActive" : ""}`} onClick={() => handlePriorityChange(1)}>
								<i className='fa-solid fa-star'></i>
							</button>
							<button className={`starButton ${inputValues.taskPriority >= 2 ? "starActive" : ""}`} onClick={() => handlePriorityChange(2)}>
								<i className='fa-solid fa-star'></i>
							</button>
							<button className={`starButton ${inputValues.taskPriority >= 3 ? "starActive" : ""}`} onClick={() => handlePriorityChange(3)}>
								<i className='fa-solid fa-star'></i>
							</button>
						</div>
					</div>
					{currentlyEdited !== null ? (
						<button className='ToDoListButton' onClick={finishEditing}>
							{t("ToDoList.toDoListFinishEditing")}
						</button>
					) : (
						<button disabled={disabledButton} className='ToDoListButton' onClick={addNewTask}>
							{t("ToDoList.toDoListAddNewTask")}
						</button>
					)}
				</section>
			) : (
				<button className='allowEditBtn' css={allowEditButtonStyles(darkMode, color)} onClick={() => changeAllowEdit(true)}>
					+
				</button>
			)}
		</>
	);
};

export default ToDoListAddTask;
