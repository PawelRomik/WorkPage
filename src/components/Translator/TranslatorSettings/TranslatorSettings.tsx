import { TranslatorLanguages } from "../TranslatorLanguages/TranslatorLanguages";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { translatorSettingsStyles } from "./TranslatorSettings.styles";

type TranslatorSettingsProps = {
	selectedLanguageFrom: string;
	selectedLanguageTo: string;
	clear: () => void;
	swapLanguages: () => void;
	handleLanguageFromChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleLanguageToChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TranslatorSettings = ({
	selectedLanguageFrom,
	selectedLanguageTo,
	clear,
	swapLanguages,
	handleLanguageFromChange,
	handleLanguageToChange,
}: TranslatorSettingsProps) => {
	const { darkMode, color } = useSettingsContext();

	return (
		<section className='translatorTopSection' css={translatorSettingsStyles(darkMode, color)}>
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
