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
	const { color } = useSettingsContext();

	const translatorLanguagesSelectStyles = useMemo(
		() => css`
			&:focus {
				border: 2px solid ${color};
			}
		`,
		[color]
	);

	return (
		<select value={passedValue} onChange={onValueChange} css={translatorLanguagesSelectStyles}>
			{languageOptions.map((option) => (
				<option key={option.code} value={option.code}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default TranslatorLanguages;
