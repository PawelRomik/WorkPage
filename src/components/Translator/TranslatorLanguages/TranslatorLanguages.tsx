import languageOptions from "../../../data/language";
import "./TranslatorLanguages.style.scss";

type translatorLanguagesProps = {
	passedValue: string;
	onValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TranslatorLanguages = ({ passedValue, onValueChange }: translatorLanguagesProps) => {
	return (
		<select value={passedValue} onChange={onValueChange}>
			{languageOptions.map((option) => (
				<option key={option.code} value={option.code}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default TranslatorLanguages;
