import { useTranslation } from "react-i18next";
import { useCurrentEditor } from "@tiptap/react";
import { notesCharsLeftStyles } from "./NotesCharsLeft.styles";
import { useSettingsContext } from "../../../../providers/SettingsContext";

const NotesCharsLeft = () => {
	const { t } = useTranslation();
	const { editor } = useCurrentEditor();
	const { darkMode } = useSettingsContext();

	return (
		<div className='charsLeft' css={notesCharsLeftStyles(darkMode)}>
			{3000 - editor?.storage.characterCount.characters()} {t("Notes.noteCharsLeft")}
		</div>
	);
};

export default NotesCharsLeft;
