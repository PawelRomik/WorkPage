import { useState, useEffect, useCallback } from "react";
import translate from "translate";
import "./Translator.style.scss";
import TranslatorLanguages from "./TranslatorLanguages/TranslatorLanguages";

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

	return (
		<div className='translatorContainer'>
			<section className='translatorTopSection'>
				<button onClick={clear} className='translationClearButton'>
					<i className='fa-solid fa-eraser'></i>
				</button>
				<div className='languagesSelection'>
					<TranslatorLanguages passedValue={selectedLanguageFrom} onValueChange={handleLanguageFromChange} />
					<button onClick={swapLanguages}>
						<i className='fa-solid fa-right-left'></i>
					</button>
					<TranslatorLanguages passedValue={selectedLanguageTo} onValueChange={handleLanguageToChange} />
				</div>
			</section>
			<section className='translatorBottomSection'>
				<textarea
					className='translateTextArea'
					id='translateTextArea'
					name='translateTextArea'
					value={inputValue}
					maxLength={1000}
					onChange={(e) => changeInputValue(e.target.value)}
				></textarea>
				<p className='translateResult'>{translated}</p>
			</section>
		</div>
	);
};

export default Translator;
