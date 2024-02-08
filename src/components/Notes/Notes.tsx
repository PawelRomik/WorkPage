import { useCallback, useEffect, useState, useMemo } from "react";
import { nanoid } from "nanoid";
import "./Notes.style.scss";
import NotesButton from "./NotesButton/NotesButton";
import NotesTextArea from "./NotesTextArea/NotesTextArea";
import LocalStorageNames from "../../utils/localstorageNames";

export type Note = {
	id: string;
	content: string;
};

const Notes = () => {
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>(undefined);
	const { localNotes } = useMemo(() => LocalStorageNames, []);

	useEffect(() => {
		const storedNotes = localStorage.getItem(localNotes);
		if (storedNotes) {
			const parsedNotes: Note[] = JSON.parse(storedNotes);
			setNotes(parsedNotes);
			setSelectedNoteId(parsedNotes.length > 0 ? parsedNotes[0].id : undefined);
		}
	}, [localNotes]);

	useEffect(() => {
		localStorage.setItem(localNotes, JSON.stringify(notes));
	}, [notes, localNotes]);

	useEffect(() => {
		setNoteValue((prevNoteValue) => {
			const selectedNote = notes.find((note) => note.id === selectedNoteId);
			return selectedNote ? selectedNote.content : prevNoteValue;
		});
	}, [selectedNoteId, notes]);

	const changeNote = useCallback(
		(id: string) => {
			const selectedNote = notes.find((note) => note.id === id);
			if (selectedNote) {
				setNoteValue(selectedNote.content);
				setSelectedNoteId(id);
			}
		},
		[notes]
	);

	const updateNote = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const text = e.target.value;
			setNoteValue(text);
			setNotes((prevNotes) => {
				const updatedNotes = prevNotes.map((note) => (note.id === selectedNoteId ? { ...note, content: text } : note));
				return updatedNotes;
			});
		},
		[selectedNoteId]
	);

	const createNewNote = useCallback(() => {
		const newNote: Note = { id: nanoid(), content: "" };
		setNotes((prevNotes) => [...prevNotes, newNote]);
		setSelectedNoteId(newNote.id);
	}, []);

	const removeNote = useCallback(
		(noteId: string, e: React.MouseEvent) => {
			e.stopPropagation();
			setNotes((prevNotes) => {
				const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
				if (selectedNoteId === noteId && updatedNotes.length > 0) {
					setSelectedNoteId(updatedNotes[0].id);
				} else if (updatedNotes.length === 0) {
					setSelectedNoteId(undefined);
				}
				return updatedNotes;
			});
		},
		[selectedNoteId]
	);

	return (
		<div className='notesContainer'>
			<NotesButton notes={notes} selectedNoteId={selectedNoteId} changeNote={changeNote} removeNote={removeNote} createNewNote={createNewNote} />
			<NotesTextArea notesLength={notes.length} noteValue={noteValue} updateNote={updateNote} />
		</div>
	);
};

export default Notes;
