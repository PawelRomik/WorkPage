import SettingsLanguageSelect from "../SettingsLanguageSelect/SettingsLanguageSelect";
import SettingsSwitch from "../SettingsSwitch/SettingsSwitch";
import "./SettingsColorsSection.style.scss";

type SettingsColorSectionProps = {
	colorInputValue: string;
	handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	darkModeInputValue: string;
	handleDarkModeChange: () => void;
};

const SettingsColorSection = ({ handleColorChange, colorInputValue, darkModeInputValue, handleDarkModeChange }: SettingsColorSectionProps) => {
	return (
		<section className='changeColorsSection'>
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
