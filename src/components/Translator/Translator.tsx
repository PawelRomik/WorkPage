import { useState, useEffect, useCallback, useMemo } from "react";
import translate from "translate";
import "./Translator.style.scss";
import TranslatorSettings from "./TranslatorSettings/TranslatorSettings";
import TranslatorTextArea from "./TranslatorTextArea/TranslatorTextArea";
import { toast } from "react-toastify";
import LocalStorageNames from "../../utils/localstorageNames";

const Translator = () => {
	const [inputValue, changeInputValue] = useState("");
	const [translated, changeTranslated] = useState<string | undefined>("");
	const [selectedLanguageTo, setSelectedLanguageTo] = useState("en");
	const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("pl");
	const { localTranslatorLanguageTo, localTranslatorLanguageFrom } = useMemo(() => LocalStorageNames, []);

	useEffect(() => {
		const storedLangTo = localStorage.getItem(localTranslatorLanguageTo);
		if (storedLangTo) {
			setSelectedLanguageTo(JSON.parse(storedLangTo));
		}
		const storedLangFrom = localStorage.getItem(localTranslatorLanguageFrom);
		if (storedLangFrom) {
			setSelectedLanguageFrom(JSON.parse(storedLangFrom));
		}
	}, [localTranslatorLanguageTo, localTranslatorLanguageFrom]);

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
				if (error instanceof Error && error.message.includes("Auth Error")) {
					toast.warn("Wrong ApiKey provided, translator won't work without it!");
				}
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
			localStorage.setItem(localTranslatorLanguageFrom, JSON.stringify(newLanguageFrom));

			if (newLanguageFrom === selectedLanguageTo) {
				setSelectedLanguageTo(selectedLanguageFrom);
				localStorage.setItem(localTranslatorLanguageTo, JSON.stringify(selectedLanguageFrom));
			}
		},
		[selectedLanguageFrom, selectedLanguageTo, localTranslatorLanguageFrom, localTranslatorLanguageTo]
	);

	const handleLanguageToChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const newLanguageTo = e.target.value;
			setSelectedLanguageTo(newLanguageTo);
			localStorage.setItem(localTranslatorLanguageTo, JSON.stringify(newLanguageTo));

			if (newLanguageTo === selectedLanguageFrom) {
				setSelectedLanguageFrom(selectedLanguageTo);
				localStorage.setItem(localTranslatorLanguageFrom, JSON.stringify(selectedLanguageTo));
			}
		},
		[selectedLanguageFrom, selectedLanguageTo, localTranslatorLanguageFrom, localTranslatorLanguageTo]
	);

	const swapLanguages = useCallback(() => {
		setSelectedLanguageFrom(selectedLanguageTo);
		setSelectedLanguageTo(selectedLanguageFrom);
		localStorage.setItem(localTranslatorLanguageFrom, JSON.stringify(selectedLanguageTo));
		localStorage.setItem(localTranslatorLanguageTo, JSON.stringify(selectedLanguageFrom));
	}, [selectedLanguageFrom, selectedLanguageTo, localTranslatorLanguageFrom, localTranslatorLanguageTo]);

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
