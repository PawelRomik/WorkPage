import SettingsLanguageSelect from "../SettingsLanguageSelect/SettingsLanguageSelect";
import SettingsSwitch from "../SettingsSwitch/SettingsSwitch";
import "./SettingsColorsSection.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";

type SettingsColorSectionProps = {
	colorInputValue: string;
	handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	darkModeInputValue: string;
	handleDarkModeChange: () => void;
	settingsLanguage: string;
	changeLanguageOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SettingsColorSection = ({
	handleColorChange,
	colorInputValue,
	darkModeInputValue,
	settingsLanguage,
	handleDarkModeChange,
	changeLanguageOnChange,
}: SettingsColorSectionProps) => {
	const { darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const darkModeStyles = useMemo(
		() => css`
			&.changeColorsSection {
				border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;
			}
		`,
		[darkMode]
	);

	return (
		<section className='changeColorsSection' css={darkModeStyles}>
			<h2>{t("Settings.settingsChangeColors")}</h2>

			<div className='colorsPanel'>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>{t("Settings.settingsMainColor")}:</label>
					<input className='colorInput' type='color' name='colorInput' value={colorInputValue} onChange={handleColorChange} id='colorInput'></input>
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
