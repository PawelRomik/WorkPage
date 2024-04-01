import SettingsLanguageSelect from "./SettingsLanguageSelect/SettingsLanguageSelect";
import SettingsSwitch from "./SettingsSwitch/SettingsSwitch";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { settingsColorsSectionStyles } from "./SettingsColorsSection.styles";

type SettingsColorSectionProps = {
	handleColorChange: (newColor: string) => void;
	darkModeInputValue: string;
	handleDarkModeChange: () => void;
	settingsLanguage: string;
	changeLanguageOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SettingsColorSection = ({ handleColorChange, darkModeInputValue, settingsLanguage, handleDarkModeChange, changeLanguageOnChange }: SettingsColorSectionProps) => {
	const { darkMode } = useSettingsContext();
	const { t } = useTranslation();

	return (
		<section className='changeColorsSection' css={settingsColorsSectionStyles(darkMode)}>
			<h2>{t("Settings.settingsChangeColors")}</h2>

			<div className='colorsPanel'>
				<div className='colorsGroup'>
					<p>{t("Settings.settingsMainColor")}:</p>
					<div className='colorsButtonsContainer'>
						<button onClick={() => handleColorChange("#FF0000")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#FFA500")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#00FF00")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#006400")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#00FFFF")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#0000FF")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#800080")} className='colorButton'></button>
						<button onClick={() => handleColorChange("#FF00FF")} className='colorButton'></button>
					</div>
				</div>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>{t("Settings.settingsMode")}:</label>
					<SettingsSwitch darkModeInputValue={darkModeInputValue} handleDarkModeChange={handleDarkModeChange} />
				</div>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>{t("Settings.settingsLanguage")}:</label>
					<SettingsLanguageSelect changeLanguageOnChange={changeLanguageOnChange} settingsLanguage={settingsLanguage} />
				</div>
			</div>
		</section>
	);
};

export default SettingsColorSection;
