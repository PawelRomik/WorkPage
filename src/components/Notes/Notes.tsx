import { useCallback, useEffect, useState, useMemo } from "react";
import { nanoid } from "nanoid";
import "./Notes.style.scss";
import NotesButton from "./NotesButton/NotesButton";
import NotesTextArea from "./NotesTextArea/NotesTextArea";
import LocalStorageNames from "../../utils/localstorageNames";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";

export type Note = {
	id: string;
	content: string;
};

const Notes = () => {
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>(undefined);
	const { localNotes } = useMemo(() => LocalStorageNames, []);
	const { darkMode, color } = useSettingsContext();

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
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					showCancelButton: true,
					confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					confirmButtonText: "Confirm",
					background: darkMode ? "white" : "black",
					color: darkMode ? "black" : "white",
					showCloseButton: true,
					target: ".notesContainer",
				})
				.then((result) => {
					if (result.isConfirmed) {
						removeNote(noteId);
						toast.success(`Succesfully deleted note`);
					}
				});
		},
		[removeNote, darkMode]
	);

	const swalStyles = useMemo(
		() => css`
			& .swal2-popup .swal2-styled:focus,
			& .swal2-close:focus {
				box-shadow: none !important;
			}
			& .swal2-close:hover,
			& .swal2-close:focus {
				color: ${color} !important;
			}

			& .swal2-actions button {
				color: ${darkMode ? "black" : "white"} !important;

				&:hover,
				&:focus {
					background-color: ${color} !important;
					color: white !important;
				}
			}
		`,
		[color, darkMode]
	);

	return (
		<div className='notesContainer' css={swalStyles}>
			<NotesButton notes={notes} selectedNoteId={selectedNoteId} changeNote={changeNote} showConfirmDialog={showConfirmDialog} createNewNote={createNewNote} />
			<NotesTextArea notesLength={notes.length} noteValue={noteValue} updateNote={updateNote} />
		</div>
	);
};

export default Notes;
