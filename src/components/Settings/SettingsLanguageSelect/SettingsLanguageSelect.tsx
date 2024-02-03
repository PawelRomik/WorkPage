import "./SettingsLanguageSelect.style.scss";

const SettingsLanguageSelect = () => {
	return (
		<select className='settingsLanguageSelect'>
			<option key='pl' value='pl'>
				Polski
			</option>
			<option key='en' value='en'>
				English
			</option>
		</select>
	);
};

export default SettingsLanguageSelect;
