import { useSettingsContext } from "../../../../providers/SettingsContext";
import { settingsLanguageSelectStyles } from "./SettingsLanguageSelect.styles";

type SettingsLanguageSelectProps = {
	changeLanguageOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	settingsLanguage: string;
};

export const SettingsLanguageSelect = ({ changeLanguageOnChange, settingsLanguage }: SettingsLanguageSelectProps) => {
	const { darkMode } = useSettingsContext();

	return (
		<select className='settingsLanguageSelect' css={settingsLanguageSelectStyles(darkMode)} onChange={changeLanguageOnChange} value={settingsLanguage}>
			<option key='pl' value='pl'>
				Polski
			</option>
			<option key='en' value='en'>
				English
			</option>
		</select>
	);
};
