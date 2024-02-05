import "./SettingsLanguageSelect.style.scss";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";

const SettingsLanguageSelect = () => {
	const { darkMode } = useSettingsContext();

	const darkModeStyles = useMemo(
		() => css`
			&.settingsLanguageSelect {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 2px solid ${darkMode ? "white" : "black"};
				background-image: url("data:image/svg+xml;utf8,<svg fill='${darkMode
					? "black"
					: "white"}' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
			}
		`,
		[darkMode]
	);

	return (
		<select className='settingsLanguageSelect' css={darkModeStyles}>
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
