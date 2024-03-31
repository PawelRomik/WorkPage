import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./data/translations/english.json";
import translationPL from "./data/translations/polish.json";

const resources = {
	en: {
		translation: translationEN,
	},
	pl: {
		translation: translationPL,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
