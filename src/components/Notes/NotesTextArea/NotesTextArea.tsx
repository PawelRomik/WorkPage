import React from "react";
import "./NotesTextArea.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { css } from "@emotion/react";

type NotesTextAreaProps = {
	notesLength: number;
	noteValue: string;
	updateNote: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const NotesTextArea = ({ notesLength, noteValue, updateNote }: NotesTextAreaProps) => {
	const { color } = useSettingsContext();
	const noteTextAreaStyles = useMemo(
		() => css`
			&:focus {
				border: 2px solid ${color};
			}
		`,
		[color]
	);

	return (
		<section className='noteEdit'>
			{notesLength > 0 ? (
				<textarea css={noteTextAreaStyles} className='noteTextArea' maxLength={5000} value={noteValue} onChange={updateNote}></textarea>
			) : (
				<p className='notesInfo'>No notes found, make a new one.</p>
			)}
		</section>
	);
};

export default NotesTextArea;
