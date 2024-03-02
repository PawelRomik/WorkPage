// src/Tiptap.jsx
import { EditorProvider } from "@tiptap/react";
import MenuBar from "../MenuBar/MenuBar";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.style.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";

type tiptapProps = {
	notesLength: number;
	noteValue: string;
	updateNote: (content: string) => void;
};

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
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
];

const Tiptap = ({ notesLength, noteValue, updateNote }: tiptapProps) => {
	return (
		<section className='noteEdit'>
			{notesLength > 0 ? (
				<div className='tiptap'>
					<EditorProvider slotBefore={<MenuBar updateNote={updateNote} noteValue={noteValue} />} extensions={extensions}>
						<></>
					</EditorProvider>
				</div>
			) : (
				<p className='notesInfo'>No notes found, make a new one.</p>
			)}
		</section>
	);
};

export default Tiptap;
