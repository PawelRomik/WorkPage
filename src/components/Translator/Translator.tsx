import { useState, useEffect, useCallback } from "react";
import translate from "translate";
import languageOptions from "../../data/language";
import "./Translator.style.scss";

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
			changeTranslated("loading");
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

	const handleLanguageFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLanguageFrom = e.target.value;
		setSelectedLanguageFrom(newLanguageFrom);

		if (newLanguageFrom === selectedLanguageTo) {
			setSelectedLanguageTo(selectedLanguageFrom);
		}
	};

	const handleLanguageToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLanguageTo = e.target.value;
		setSelectedLanguageTo(newLanguageTo);

		if (newLanguageTo === selectedLanguageFrom) {
			setSelectedLanguageFrom(selectedLanguageTo);
		}
	};

	const swapLanguages = () => {
		setSelectedLanguageFrom(selectedLanguageTo);
		setSelectedLanguageTo(selectedLanguageFrom);
	};

	const clear = () => {
		changeInputValue("");
	};

	return (
		<div className='translatorContainer'>
			<section className='translatorTopSection'>
				<button onClick={clear} className='translationClearButton'>
					<i className='fa-solid fa-eraser'></i>
				</button>
				<div className='languagesSelection'>
					<select value={selectedLanguageFrom} onChange={handleLanguageFromChange}>
						{languageOptions.map((option) => (
							<option key={option.code} value={option.code}>
								{option.label}
							</option>
						))}
					</select>
					<button onClick={swapLanguages}>
						<i className='fa-solid fa-right-left'></i>
					</button>
					<select value={selectedLanguageTo} onChange={handleLanguageToChange}>
						{languageOptions.map((option) => (
							<option key={option.code} value={option.code}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</section>
			<section className='translatorBottomSection'>
				<textarea className='translateInput' id='translateInput' name='translateInput' value={inputValue} onChange={(e) => changeInputValue(e.target.value)}></textarea>
				<p className='translateResult'>{translated}</p>
			</section>
		</div>
	);
};

export default Translator;
