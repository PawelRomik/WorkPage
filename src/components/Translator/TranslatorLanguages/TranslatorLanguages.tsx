import languageOptions from "../../../data/language";
import "./TranslatorLanguages.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";

type translatorLanguagesProps = {
	passedValue: string;
	onValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TranslatorLanguages = ({ passedValue, onValueChange }: translatorLanguagesProps) => {
	const { color, darkMode } = useSettingsContext();

	const translatorLanguagesSelectStyles = useMemo(
		() => css`
			&:focus {
				border: 4px solid ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			& {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 4px solid ${darkMode ? "white" : "black"};
			}
		`,
		[darkMode]
	);

	return (
		<select value={passedValue} onChange={onValueChange} css={[translatorLanguagesSelectStyles, darkModeStyles]}>
			{languageOptions.map((option) => (
				<option key={option.code} value={option.code}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default TranslatorLanguages;
