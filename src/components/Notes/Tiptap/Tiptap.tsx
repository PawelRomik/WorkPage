import { EditorProvider } from "@tiptap/react";
import MenuBar from "../MenuBar/MenuBar";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { useTranslation } from "react-i18next";
import { noteEditStyles, noteInfoStyles, tiptapStyles } from "./Tiptap.styles";

type tiptapProps = {
	notesLength: number;
	noteValue: string;
	updateNote: (content: string) => void;
};

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ HTMLAttributes: { types: [ListItem.name] } }),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
		},
	}),
	CharacterCount.configure({
		limit: 3000,
	}),
];

const Tiptap = ({ notesLength, noteValue, updateNote }: tiptapProps) => {
	const { t } = useTranslation();
	const { darkMode } = useSettingsContext();
	return (
		<section className='noteEdit' css={noteEditStyles}>
			{notesLength > 0 ? (
				<div className='tiptap' css={tiptapStyles(darkMode)}>
					<EditorProvider slotBefore={<MenuBar updateNote={updateNote} noteValue={noteValue} />} extensions={extensions}>
						<></>
					</EditorProvider>
				</div>
			) : (
				<p className='noteInfo' css={noteInfoStyles(darkMode)}>
					{t("Notes.noNotes")}
				</p>
			)}
		</section>
	);
};

export default Tiptap;
