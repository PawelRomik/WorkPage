import React from "react";
import { Note } from "../Notes";
import { useMemo } from "react";
import "./NotesButton.style.scss";

type NotesButtonProps = {
	notes: Note[];
	selectedNoteId: string | undefined;
	changeNote: (id: string) => void;
	removeNote: (noteId: string, e: React.MouseEvent) => void;
	createNewNote: () => void;
};

const NotesButton = ({ notes, selectedNoteId, changeNote, removeNote, createNewNote }: NotesButtonProps) => {
	const noteElements = useMemo(
		() =>
			notes.map((note, numericId) => (
				<div className={`noteButton ${selectedNoteId === note.id ? "active" : ""}`} key={note.id} onClick={() => changeNote(note.id)}>
					{numericId}
					<button className='removeNote' onClick={(e) => removeNote(note.id, e)}>
						<i className='fa-solid fa-trash'></i>
					</button>
				</div>
			)),
		[changeNote, notes, removeNote, selectedNoteId]
	);

	return (
		<section className='notesSelection'>
			<div className='notesWrapper'>
				{noteElements}
				<button className='noteButton addNewNote' onClick={createNewNote}>
					+
				</button>
			</div>
		</section>
	);
};

export default NotesButton;
