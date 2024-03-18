import SettingsLanguageSelect from "../SettingsLanguageSelect/SettingsLanguageSelect";
import SettingsSwitch from "../SettingsSwitch/SettingsSwitch";
import "./SettingsColorsSection.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";

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

	const darkModeStyles = useMemo(
		() => css`
			&.changeColorsSection {
				border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;
			}

			& .colorButton {
				border: 2px solid ${darkMode ? "white" : "black"};

				&:nth-of-type(1) {
					background-color: red;
				}
				&:nth-of-type(2) {
					background-color: orange;
				}
				&:nth-of-type(3) {
					background-color: lime;
				}
				&:nth-of-type(4) {
					background-color: darkgreen;
				}
				&:nth-of-type(5) {
					background-color: aqua;
				}
				&:nth-of-type(6) {
					background-color: blue;
				}
				&:nth-of-type(7) {
					background-color: purple;
				}
				&:nth-of-type(8) {
					background-color: magenta;
				}
			}
		`,
		[darkMode]
	);

	return (
		<section className='changeColorsSection' css={darkModeStyles}>
			<h2>{t("Settings.settingsChangeColors")}</h2>

			<div className='colorsPanel'>
				<div className='colorsGroup'>
					<p>{t("Settings.settingsMainColor")}:</p>
					<div className='colorsButtonsContainer'>
						<button onClick={() => handleColorChange("red")} className='colorButton'></button>
						<button onClick={() => handleColorChange("orange")} className='colorButton'></button>
						<button onClick={() => handleColorChange("lime")} className='colorButton'></button>
						<button onClick={() => handleColorChange("darkgreen")} className='colorButton'></button>
						<button onClick={() => handleColorChange("aqua")} className='colorButton'></button>
						<button onClick={() => handleColorChange("blue")} className='colorButton'></button>
						<button onClick={() => handleColorChange("purple")} className='colorButton'></button>
						<button onClick={() => handleColorChange("magenta")} className='colorButton'></button>
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
