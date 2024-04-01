import languageOptions from "../../../data/language";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { translatorLanguagesStyles } from "./TranslatorLanguages.styles";

type translatorLanguagesProps = {
	passedValue: string;
	onValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TranslatorLanguages = ({ passedValue, onValueChange }: translatorLanguagesProps) => {
	const { color, darkMode } = useSettingsContext();

	return (
		<select value={passedValue} className='translatorLanguagesSelect' onChange={onValueChange} css={translatorLanguagesStyles(darkMode, color)}>
			{languageOptions.map((option) => (
				<option key={option.code} value={option.code}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default TranslatorLanguages;
