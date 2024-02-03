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
	const { color } = useSettingsContext();

	const editButtonStyles = useMemo(
		() => css`
			&:focus,
			&:hover {
				color: ${color};
			}
		`,
		[color]
	);

	return (
		<>
			{allowEdit ? (
				<section className='ToDoListAddTask'>
					<button className='hideEditBtn' onClick={closeEdit} css={editButtonStyles}>
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
						<button className='ToDoListButton' onClick={addNewTask}>
							Add new task
						</button>
					)}
				</section>
			) : (
				<button className='allowEditBtn' css={editButtonStyles} onClick={() => changeAllowEdit(true)}>
					+
				</button>
			)}
		</>
	);
};

export default ToDoListAddTask;
