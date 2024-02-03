import { useSettingsContext } from "../../../providers/SettingsContext";
import "./TranslatorTextArea.style.scss";
import { css } from "@emotion/react";
import { useMemo } from "react";

type TranslatorTextAreaProps = {
	inputValue: string;
	updateInputValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	translated: string | undefined;
};

const TranslatorTextArea = ({ inputValue, updateInputValue, translated }: TranslatorTextAreaProps) => {
	const { color } = useSettingsContext();

	const translatorTextAreaStyles = useMemo(
		() => css`
			&:focus {
				border: 2px solid ${color};
			}
		`,
		[color]
	);

	return (
		<section className='translatorBottomSection'>
			<textarea
				className='translateTextArea'
				id='translateTextArea'
				css={translatorTextAreaStyles}
				name='translateTextArea'
				value={inputValue}
				maxLength={1000}
				onChange={updateInputValue}
			></textarea>
			<p className='translateResult'>{translated}</p>
		</section>
	);
};

export default TranslatorTextArea;
