import { Note } from "../Notes";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { notesSelectionStyles } from "./NotesSelection.styles";
import NotesButton from "./NotesButton/NotesButton";

type NotesSelectionProps = {
	notes: Note[];
	selectedNoteId: number | undefined;
	changeNote: (id: number) => void;
	removeNote: (noteId: number) => void;
	createNewNote: () => void;
};

const NotesSelection = ({ notes, selectedNoteId, changeNote, removeNote, createNewNote }: NotesSelectionProps) => {
	const { color, darkMode } = useSettingsContext();

	return (
		<section className='notesSelection' css={notesSelectionStyles(darkMode, color)}>
			<NotesButton notes={notes} selectedNoteId={selectedNoteId} changeNote={changeNote} removeNote={removeNote} createNewNote={createNewNote} />
		</section>
	);
};

export default NotesSelection;
