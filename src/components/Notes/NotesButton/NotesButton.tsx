import React from "react";
import { Note } from "../Notes";
import { useMemo } from "react";
import "./NotesButton.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";

type NotesButtonProps = {
	notes: Note[];
	selectedNoteId: string | undefined;
	changeNote: (id: string) => void;
	removeNote: (noteId: string, e: React.MouseEvent) => void;
	createNewNote: () => void;
};

const NotesButton = ({ notes, selectedNoteId, changeNote, removeNote, createNewNote }: NotesButtonProps) => {
	const { color } = useSettingsContext();
	const notesSelectionScrollbarStyles = useMemo(
		() => css`
			& {
				scrollbar-color: ${color};
			}

			&::-webkit-scrollbar-thumb {
				background-color: ${color};
			}
		`,
		[color]
	);

	const noteButtonStyles = useMemo(
		() => css`
			&:hover,
			&:focus,
			&.active {
				& .removeNote {
					&:hover,
					&:focus {
						color: ${color};
					}
				}
			}

			&.active {
				border: 2px solid ${color};

				& .removeNote {
					border: 2px solid ${color};
				}
			}
		`,
		[color]
	);

	const addNewNoteStyles = useMemo(
		() => css`
			& {
				background-color: ${color};
			}

			&:hover,
			&:focus {
				background-color: ${color};
			}
		`,
		[color]
	);

	const noteElements = useMemo(
		() =>
			notes.map((note, numericId) => (
				<div className={`noteButton ${selectedNoteId === note.id ? "active" : ""}`} css={noteButtonStyles} key={note.id} onClick={() => changeNote(note.id)}>
					{numericId}
					<button className='removeNote' onClick={(e) => removeNote(note.id, e)}>
						<i className='fa-solid fa-trash'></i>
					</button>
				</div>
			)),
		[changeNote, notes, removeNote, selectedNoteId, noteButtonStyles]
	);

	return (
		<section className='notesSelection' css={notesSelectionScrollbarStyles}>
			<div className='notesWrapper'>
				{noteElements}
				<button className='noteButton addNewNote' css={addNewNoteStyles} onClick={createNewNote}>
					+
				</button>
			</div>
		</section>
	);
};

export default NotesButton;
