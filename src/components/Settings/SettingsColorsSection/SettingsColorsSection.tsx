import SettingsLanguageSelect from "../SettingsLanguageSelect/SettingsLanguageSelect";
import SettingsSwitch from "../SettingsSwitch/SettingsSwitch";
import "./SettingsColorsSection.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";

type SettingsColorSectionProps = {
	colorInputValue: string;
	handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	darkModeInputValue: string;
	handleDarkModeChange: () => void;
};

const SettingsColorSection = ({ handleColorChange, colorInputValue, darkModeInputValue, handleDarkModeChange }: SettingsColorSectionProps) => {
	const { darkMode } = useSettingsContext();

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
			<h2>CHANGE COLORS</h2>

			<div className='colorsPanel'>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>Main Color:</label>
					<input className='colorInput' type='color' name='colorInput' value={colorInputValue} onChange={handleColorChange} id='colorInput'></input>
				</div>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>Mode:</label>
					<SettingsSwitch darkModeInputValue={darkModeInputValue} handleDarkModeChange={handleDarkModeChange} />
				</div>
				<div className='colorsGroup'>
					<label htmlFor='colorInput'>Language:</label>
					<SettingsLanguageSelect />
				</div>
			</div>
		</section>
	);
};

export default SettingsColorSection;
