import React from "react";
import { Task } from "../ToDoList";
import "./ToDoListAddTask.style.scss";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";

type ToDoListAddTaskProps = {
	allowEdit: boolean;
	changeAllowEdit: React.Dispatch<React.SetStateAction<boolean>>;
	inputValues: Task;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addNewTask: () => void;
	finishEditing: () => void;
	currentlyEdited: number | null;
	closeEdit: () => void;
};

const ToDoListAddTask = ({ allowEdit, changeAllowEdit, inputValues, handleInputChange, addNewTask, finishEditing, currentlyEdited, closeEdit }: ToDoListAddTaskProps) => {
	const { color, darkMode } = useSettingsContext();

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
				color: ${darkMode ? "black" : "#999"};
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
					color: gray;
				}

				.ToDoListButton:not(:disabled) {
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode]
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
						<label htmlFor='taskName'>Title:</label>
						<p>Min. 3 chars.</p>
						<input className='ToDoListInput' type='text' id='taskName' name='taskName' value={inputValues.taskName} onChange={handleInputChange}></input>
					</div>
					<div className='ToDoListInputWrapper'>
						<label htmlFor='taskContent'>Description:</label>
						<input className='ToDoListInput' type='text' id='taskContent' name='taskContent' value={inputValues.taskContent} onChange={handleInputChange}></input>
					</div>
					<div className='ToDoListInputWrapper'>
						<label htmlFor='taskPriority'>Priority:</label>
						<div className='ToDoListRadioButtons'>
							<div>
								<input type='radio' id='priority1' name='taskPriority' value={1} checked={Number(inputValues.taskPriority) === 1} onChange={handleInputChange} />
								<label htmlFor='priority1'>
									1<i className='fa-solid fa-star'></i>
								</label>
							</div>

							<div>
								<input type='radio' id='priority2' name='taskPriority' value={2} checked={Number(inputValues.taskPriority) === 2} onChange={handleInputChange} />
								<label htmlFor='priority2'>
									2<i className='fa-solid fa-star'></i>
								</label>
							</div>

							<div>
								<input type='radio' id='priority3' name='taskPriority' value={3} checked={Number(inputValues.taskPriority) === 3} onChange={handleInputChange} />
								<label htmlFor='priority3'>
									3<i className='fa-solid fa-star'></i>
								</label>
							</div>
						</div>
					</div>
					{currentlyEdited !== null ? (
						<button className='ToDoListButton' onClick={finishEditing}>
							Finish Editing
						</button>
					) : (
						<button disabled={disabledButton} className='ToDoListButton' onClick={addNewTask}>
							Add new task
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
