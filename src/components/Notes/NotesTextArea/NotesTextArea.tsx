import React from "react";
import "./NotesTextArea.style.scss";

type NotesTextAreaProps = {
	notesLength: number;
	noteValue: string;
	updateNote: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const NotesTextArea = ({ notesLength, noteValue, updateNote }: NotesTextAreaProps) => {
	return (
		<section className='noteEdit'>
			{notesLength > 0 ? (
				<textarea className='noteTextArea' maxLength={5000} value={noteValue} onChange={updateNote}></textarea>
			) : (
				<p className='notesInfo'>No notes found, make a new one.</p>
			)}
		</section>
	);
};

export default NotesTextArea;
