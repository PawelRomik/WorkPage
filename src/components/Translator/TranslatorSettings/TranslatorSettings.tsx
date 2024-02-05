import TranslatorLanguages from "../TranslatorLanguages/TranslatorLanguages";
import "./TranslatorSettings.style.scss";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";

type TranslatorSettingsProps = {
	selectedLanguageFrom: string;
	selectedLanguageTo: string;
	clear: () => void;
	swapLanguages: () => void;
	handleLanguageFromChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleLanguageToChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TranslatorSettings = ({ selectedLanguageFrom, selectedLanguageTo, clear, swapLanguages, handleLanguageFromChange, handleLanguageToChange }: TranslatorSettingsProps) => {
	const { color, darkMode } = useSettingsContext();

	const translatorTopSectionButtonStyles = useMemo(
		() => css`
			button:focus,
			button:hover {
				border: 2px solid ${color};
				color: ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.translatorTopSection {
				background-color: ${darkMode ? "lightgray" : "rgb(27,27,27)"};

				button {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode]
	);

	return (
		<section className='translatorTopSection' css={[darkModeStyles, translatorTopSectionButtonStyles]}>
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
