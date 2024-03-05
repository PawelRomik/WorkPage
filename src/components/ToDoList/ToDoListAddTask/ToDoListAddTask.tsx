import React from "react";
import { Task } from "../ToDoList";
import "./ToDoListAddTask.style.scss";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

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

	const editButtonStyles = useMemo(
		() => css`
			,
			& .ToDoListInput:focus {
				border: 2px solid ${color} !important;
			}

			& .ToDoListButton:not(:disabled):focus,
			& .ToDoListButton:not(:disabled):hover {
				background-color: ${color} !important;
				color: white !important;
			}
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.allowEditBtn {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 2px solid ${darkMode ? "white" : "black"};
			}

			& .ToDoListInputWrapper p {
				color: ${color};
			}

			& .starButton {
				color: ${darkMode ? "black" : "white"};
				&.starActive {
					color: ${color};
				}
			}

			&.ToDoListAddTask {
				background-color: ${darkMode ? "white" : "black"};
				border: 2px solid ${darkMode ? "white" : "black"};

				label {
					color: ${darkMode ? "black" : "white"};
				}

				.hideEditBtn {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
				}

				.ToDoListInput {
					border: 2px solid ${darkMode ? "black" : "white"};
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
				}

				.ToDoListButton {
					border: 2px solid ${darkMode ? "black" : "white"};
					background-color: ${darkMode ? "white" : "black"};
					opacity: 0.5;
					color: gray;
				}

				.ToDoListButton:not(:disabled) {
					opacity: 1;
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode, color]
	);

	const disabledButton = useMemo(() => {
		return inputValues.taskName.length < 3;
	}, [inputValues]);

	return (
		<>
			{allowEdit ? (
				<section className='ToDoListAddTask' css={[darkModeStyles, editButtonStyles]}>
					<button className='hideEditBtn' onClick={closeEdit} css={editButtonStyles}>
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
				<button className='allowEditBtn' css={[darkModeStyles, editButtonStyles]} onClick={() => changeAllowEdit(true)}>
					+
				</button>
			)}
		</>
	);
};

export default ToDoListAddTask;
