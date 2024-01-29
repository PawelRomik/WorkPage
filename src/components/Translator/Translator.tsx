import { useState, useEffect, useCallback } from "react";
import translate from "translate";
import "./Translator.style.scss";
import TranslatorSettings from "./TranslatorSettings/TranslatorSettings";
import TranslatorTextArea from "./TranslatorTextArea/TranslatorTextArea";

const Translator = () => {
	const [inputValue, changeInputValue] = useState("");
	const [translated, changeTranslated] = useState<string | undefined>("");
	const [selectedLanguageTo, setSelectedLanguageTo] = useState("en");
	const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("pl");

	const translation = useCallback(
		async (text: string) => {
			try {
				if (text) {
					const result = await translate(text, {
						from: selectedLanguageFrom,
						to: selectedLanguageTo,
						engine: "deepl",
						key: import.meta.env.VITE_TRANSLATOR_API,
					});
					changeTranslated(result);
				} else {
					changeTranslated("");
				}
			} catch (error) {
				console.error("Translation error:", error);
				changeTranslated("");
			}
		},
		[selectedLanguageTo, selectedLanguageFrom]
	);

	useEffect(() => {
		if (inputValue) {
			changeTranslated("Translating... Please wait.");
		} else {
			changeTranslated("");
		}

		const timeoutId = setTimeout(() => {
			translation(inputValue);
		}, 2000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [inputValue, translation]);

	const handleLanguageFromChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const newLanguageFrom = e.target.value;
			setSelectedLanguageFrom(newLanguageFrom);

			if (newLanguageFrom === selectedLanguageTo) {
				setSelectedLanguageTo(selectedLanguageFrom);
			}
		},
		[selectedLanguageFrom, selectedLanguageTo]
	);

	const handleLanguageToChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const newLanguageTo = e.target.value;
			setSelectedLanguageTo(newLanguageTo);

			if (newLanguageTo === selectedLanguageFrom) {
				setSelectedLanguageFrom(selectedLanguageTo);
			}
		},
		[selectedLanguageFrom, selectedLanguageTo]
	);

	const swapLanguages = useCallback(() => {
		setSelectedLanguageFrom(selectedLanguageTo);
		setSelectedLanguageTo(selectedLanguageFrom);
	}, [selectedLanguageFrom, selectedLanguageTo]);

	const clear = useCallback(() => {
		changeInputValue("");
	}, []);

	const updateInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeInputValue(e.target.value);
	};

	return (
		<div className='translatorContainer'>
			<TranslatorSettings
				selectedLanguageFrom={selectedLanguageFrom}
				handleLanguageToChange={handleLanguageToChange}
				handleLanguageFromChange={handleLanguageFromChange}
				selectedLanguageTo={selectedLanguageTo}
				swapLanguages={swapLanguages}
				clear={clear}
			/>
			<TranslatorTextArea inputValue={inputValue} updateInputValue={updateInputValue} translated={translated} />
		</div>
	);
};

export default Translator;
