import TranslatorLanguages from "../TranslatorLanguages/TranslatorLanguages";
import "./TranslatorSettings.style.scss";

type TranslatorSettingsProps = {
	selectedLanguageFrom: string;
	selectedLanguageTo: string;
	clear: () => void;
	swapLanguages: () => void;
	handleLanguageFromChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleLanguageToChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TranslatorSettings = ({ selectedLanguageFrom, selectedLanguageTo, clear, swapLanguages, handleLanguageFromChange, handleLanguageToChange }: TranslatorSettingsProps) => {
	return (
		<section className='translatorTopSection'>
			<button onClick={clear} className='translationClearButton'>
				<i className='fa-solid fa-eraser'></i>
			</button>
			<div className='languagesSelection'>
				<TranslatorLanguages passedValue={selectedLanguageFrom} onValueChange={handleLanguageFromChange} />
				<button onClick={swapLanguages}>
					<i className='fa-solid fa-right-left'></i>
				</button>
				<TranslatorLanguages passedValue={selectedLanguageTo} onValueChange={handleLanguageToChange} />
			</div>
		</section>
	);
};

export default TranslatorSettings;
