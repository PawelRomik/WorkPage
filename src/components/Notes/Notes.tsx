import { useCallback, useEffect, useState, useMemo } from "react";
import { nanoid } from "nanoid";
import "./Notes.style.scss";
import NotesButton from "./NotesButton/NotesButton";
import Tiptap from "./Tiptap/Tiptap";
import LocalStorageNames from "../../utils/localstorageNames";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSettingsContext } from "../../providers/SettingsContext";

export type Note = {
	id: string;
	content: string;
};

const Notes = () => {
	const { t } = useTranslation();
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>(undefined);
	const { localNotes } = useMemo(() => LocalStorageNames, []);
	const { darkMode } = useSettingsContext();

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
		(content: string) => {
			setNotes((prevNotes) => {
				const updatedNotes = prevNotes.map((note) => (note.id === selectedNoteId ? { ...note, content: content } : note));
				return updatedNotes;
			});
		},
		[selectedNoteId]
	);

	const createNewNote = useCallback(() => {
		const newNote: Note = {
			id: nanoid(),
			content: `
		<h2>${t("Notes.newNoteTitle")}</h2>
		<p>${t("Notes.newNoteDesc")}</p>
		`,
		};
		setNotes((prevNotes) => [...prevNotes, newNote]);
		setSelectedNoteId(newNote.id);
	}, [t]);

	const removeNote = useCallback(
		(noteId: string) => {
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

	const showConfirmDialog = useCallback(
		(noteId: string, e: React.MouseEvent) => {
			e.stopPropagation();
			withReactContent(Swal)
				.fire({
					title: t("Swal.swalTitle"),
					text: t("Swal.swalDesc"),
					showCancelButton: true,
					confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					confirmButtonText: t("Swal.swalYes"),
					cancelButtonText: t("Swal.swalNo"),
					background: darkMode ? "white" : "black",
					color: darkMode ? "black" : "white",
					showCloseButton: true,
					target: ".notesContainer",
				})
				.then((result) => {
					if (result.isConfirmed) {
						removeNote(noteId);
						toast.success(t("Notes.toastRemovedNote"));
					}
				});
		},
		[removeNote, darkMode, t]
	);

	return (
		<div className='notesContainer'>
			<NotesButton notes={notes} selectedNoteId={selectedNoteId} changeNote={changeNote} showConfirmDialog={showConfirmDialog} createNewNote={createNewNote} />
			<Tiptap notesLength={notes.length} noteValue={noteValue} updateNote={updateNote} />
		</div>
	);
};

export default Notes;
