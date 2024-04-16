import { languageOptions } from "../../../data/language";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { translatorLanguagesStyles } from "./TranslatorLanguages.styles";

type translatorLanguagesProps = {
	passedValue: string;
	onValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TranslatorLanguages = ({ passedValue, onValueChange }: translatorLanguagesProps) => {
	const { color, darkMode } = useSettingsContext();

	return (
		<select value={passedValue} className='translatorLanguagesSelect' onChange={onValueChange} css={translatorLanguagesStyles(darkMode, color)}>
			{languageOptions.map(({ code, label }) => (
				<option key={code} value={code}>
					{label}
				</option>
			))}
		</select>
	);
};
