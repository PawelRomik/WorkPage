import { useCurrentEditor } from "@tiptap/react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useCallback, useEffect } from "react";

type MenuBarProps = {
	updateNote: (content: string) => void;
	noteValue: string;
};

const MenuBar = ({ updateNote, noteValue }: MenuBarProps) => {
	const { editor } = useCurrentEditor();
	const { color } = useSettingsContext();

	useEffect(() => {
		if (editor) {
			const content = noteValue;
			const pattern = /rgb\(.{1,4},.{1,4},.{1,4}\)/g;

			const newContent = content.replace(pattern, color);
			console.log(editor);

			editor.commands.setContent(newContent);

			editor.off("update");
			editor.on("update", ({ editor }) => {
				const html = editor.getHTML();
				updateNote(html);
			});
		}
	}, [noteValue, editor, updateNote, color]);

	const setColors = useCallback(() => {
		if (editor?.isActive("textStyle")) {
			editor?.chain().focus().unsetColor().run();
		} else {
			editor?.chain().focus().setColor(color).run();
		}
	}, [color, editor]);

	if (!editor) {
		return null;
	}

	return (
		<>
			<div className='tiptapButtons'>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={editor.isActive("bold") ? "is-active" : ""}
				>
					<i className='fa-solid fa-bold'></i>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={editor.isActive("italic") ? "is-active" : ""}
				>
					<i className='fa-solid fa-italic'></i>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={editor.isActive("strike") ? "is-active" : ""}
				>
					<i className='fa-solid fa-strikethrough'></i>
				</button>
				<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					<i className='fa-solid fa-eraser'></i>
				</button>
				<button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "is-active" : ""}>
					<i className='fa-solid fa-paragraph'></i>
				</button>
				<button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
					<i className='fa-solid fa-heading'></i>
					<sub>
						<b> 1</b>
					</sub>
				</button>
				<button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
					<i className='fa-solid fa-heading'></i>
					<sub>
						<b> 2</b>
					</sub>
				</button>
				<button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
					<i className='fa-solid fa-heading'></i>
					<sub>
						<b> 3</b>
					</sub>
				</button>
				<button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
					<i className='fa-solid fa-list-ul'></i>
				</button>
				<button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
					<i className='fa-solid fa-list-ol'></i>
				</button>
				<button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "is-active" : ""}>
					<i className='fa-solid fa-code'></i>
				</button>
				<button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
					<i className='fa-solid fa-quote-left'></i>
				</button>
				<button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
					<i className='fa-solid fa-rotate-left'></i>
				</button>
				<button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
					<i className='fa-solid fa-rotate-right'></i>
				</button>
				<button onClick={setColors} className={editor.isActive("textStyle", { color: color }) ? "is-active" : ""}>
					<i className='fa-solid fa-paintbrush'></i>
				</button>
			</div>
		</>
	);
};

export default MenuBar;
