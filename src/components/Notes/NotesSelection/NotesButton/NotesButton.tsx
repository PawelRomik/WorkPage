import type { Note } from "../../Notes";
import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import { launchToast } from "../../../../utils/toastFunction";
import { useSettingsContext } from "../../../../providers/SettingsContext";
import { notesButtonStyles } from "./NotesButton.style";

type NotesButtonProps = {
	notes: Note[];
	selectedNoteId: number | undefined;
	changeNote: (id: number) => void;
	removeNote: (noteId: number) => void;
	createNewNote: () => void;
};

export const NotesButton = ({ notes, changeNote, removeNote, createNewNote, selectedNoteId }: NotesButtonProps) => {
	const { t } = useTranslation();
	const { darkMode, color } = useSettingsContext();

	const showConfirmDialog = useCallback(
		(noteId: number, e: React.MouseEvent) => {
			e.stopPropagation();
			withReactContent(Swal)
				.fire({
					title: t("Swal.swalTitle"),
					text: t("Swal.swalDesc"),
					showCancelButton: true,
					confirmButtonColor: darkMode ? "#dfdfdf" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "#dfdfdf" : "rgb(27, 27, 27)",
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
						launchToast("success", t("Notes.toastRemovedNote"));
					}
				});
		},
		[removeNote, darkMode, t]
	);

	const noteElements = useMemo(
		() =>
			notes
				.sort((a, b) => a.id - b.id)
				.map(({ id }) => (
					<div className={`noteButton ${selectedNoteId === id ? "active" : ""}`} css={notesButtonStyles(darkMode, color)} key={id} onClick={() => changeNote(id)}>
						{id}
						<button className='removeNote' onClick={(e) => showConfirmDialog(id, e)}>
							<i className='fa-solid fa-trash'></i>
						</button>
					</div>
				)),
		[changeNote, notes, showConfirmDialog, selectedNoteId, color, darkMode]
	);

	return (
		<div className='notesWrapper'>
			<button className='noteButton addNewNote' css={notesButtonStyles(darkMode, color)} onClick={createNewNote}>
				+
			</button>
			{noteElements}
		</div>
	);
};
