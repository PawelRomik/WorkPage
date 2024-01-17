import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./Notes.style.scss";

interface Note {
	id: string;
	content: string;
}

const Notes = () => {
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<string>("");

	useEffect(() => {
		const storedNotes = localStorage.getItem("notes");
		if (storedNotes) {
			const parsedNotes: Note[] = JSON.parse(storedNotes);
			setNotes(parsedNotes);
			setSelectedNoteId(parsedNotes.length > 0 ? parsedNotes[0].id : "");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		setNoteValue((prevNoteValue) => {
			const selectedNote = notes.find((note) => note.id === selectedNoteId);
			return selectedNote ? selectedNote.content : prevNoteValue;
		});
	}, [selectedNoteId, notes]);

	const changeNote = (id: string) => {
		const selectedNote = notes.find((note) => note.id === id);
		if (selectedNote) {
			setNoteValue(selectedNote.content);
			setSelectedNoteId(id);
		}
	};

	const updateNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value;
		setNoteValue(text);
		setNotes((prevNotes) => {
			const updatedNotes = prevNotes.map((note) => (note.id === selectedNoteId ? { ...note, content: text } : note));
			return updatedNotes;
		});
	};

	const createNewNote = () => {
		const newNote: Note = { id: nanoid(), content: "" };
		setNotes((prevNotes) => [...prevNotes, newNote]);
		setSelectedNoteId(newNote.id);
	};

	const removeNote = (noteId: string, event: React.MouseEvent) => {
		event.stopPropagation();
		setNotes((prevNotes) => {
			const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
			if (selectedNoteId === noteId && updatedNotes.length > 0) {
				setSelectedNoteId(updatedNotes[0].id);
			} else if (updatedNotes.length === 0) {
				setSelectedNoteId("");
			}
			return updatedNotes;
		});
	};

	const noteElements = notes.map((note, numericId) => (
		<div className={`noteButton ${selectedNoteId === note.id ? "active" : ""}`} key={note.id} onClick={() => changeNote(note.id)}>
			{numericId}
			<button className='removeNote' onClick={(e) => removeNote(note.id, e)}>
				<i className='fa-solid fa-trash'></i>
			</button>
		</div>
	));

	return (
		<div className='notesContainer'>
			<section className='notesSelection'>
				<div className='notesWrapper'>
					{noteElements}
					<button className='noteButton' onClick={createNewNote}>
						+
					</button>
				</div>
			</section>
			<section className='noteEdit'>
				{notes.length > 0 ? <textarea className='noteTextArea' value={noteValue} onChange={updateNote}></textarea> : <p className='notesInfo'>No notes found, make a new one.</p>}
			</section>
		</div>
	);
};

export default Notes;
