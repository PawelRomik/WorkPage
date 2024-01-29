import "./TranslatorTextArea.style.scss";

type TranslatorTextAreaProps = {
	inputValue: string;
	updateInputValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	translated: string | undefined;
};

const TranslatorTextArea = ({ inputValue, updateInputValue, translated }: TranslatorTextAreaProps) => {
	return (
		<section className='translatorBottomSection'>
			<textarea className='translateTextArea' id='translateTextArea' name='translateTextArea' value={inputValue} maxLength={1000} onChange={updateInputValue}></textarea>
			<p className='translateResult'>{translated}</p>
		</section>
	);
};

export default TranslatorTextArea;
