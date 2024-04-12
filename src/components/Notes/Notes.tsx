import { useCallback, useEffect, useState } from "react";
import NotesSelection from "./NotesSelection/NotesSelection";
import Tiptap from "./Tiptap/Tiptap";
import LocalStorageNames from "../../utils/localstorageNames";
import { useTranslation } from "react-i18next";
import { notesContainerStyles } from "./Notes.styles";

export type Note = {
	id: number;
	content: string;
};

const { localNotes } = LocalStorageNames;

const Notes = () => {
	const { t } = useTranslation();
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<number | undefined>(undefined);

	const changeNote = useCallback(
		(id: number) => {
			const selectedNote = notes.find((note) => note.id === id);
			if (selectedNote) {
				setNoteValue(selectedNote.content);
				setSelectedNoteId(id);
			}
		},
		[notes]
	);

	const updateNote = useCallback(
		(content: string) => {
			setNotes((prevNotes) => {
				const updatedNotes = prevNotes.map((note) => (note.id === selectedNoteId ? { ...note, content: content } : note));
				return updatedNotes;
			});
		},
		[selectedNoteId]
	);

	const createNewNote = useCallback(() => {
		let id = 1;
		const existingIds = new Set<number>();
		const existingNotes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
		existingNotes.forEach((note) => existingIds.add(note.id));

		while (existingIds.has(id)) {
			id++;
		}

		const newNote: Note = {
			id: id,
			content: `
		<h2>${t("Notes.newNoteTitle")}</h2>
		<p>${t("Notes.newNoteDesc")}</p>
		`,
		};
		setNotes((prevNotes) => [...prevNotes, newNote]);
		setSelectedNoteId(newNote.id);
	}, [t]);

	const removeNote = useCallback(
		(noteId: number) => {
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

	useEffect(() => {
		const storedNotes = localStorage.getItem(localNotes);
		if (storedNotes) {
			const parsedNotes: Note[] = JSON.parse(storedNotes);
			setNotes(parsedNotes);
			setSelectedNoteId(parsedNotes.length > 0 ? parsedNotes[0].id : undefined);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(localNotes, JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		setNoteValue((prevNoteValue) => {
			const selectedNote = notes.find((note) => note.id === selectedNoteId);
			return selectedNote ? selectedNote.content : prevNoteValue;
		});
	}, [selectedNoteId, notes]);

	return (
		<div className='notesContainer' css={notesContainerStyles}>
			<NotesSelection notes={notes} selectedNoteId={selectedNoteId} changeNote={changeNote} removeNote={removeNote} createNewNote={createNewNote} />
			<Tiptap notesLength={notes.length} noteValue={noteValue} updateNote={updateNote} />
		</div>
	);
};

export default Notes;
