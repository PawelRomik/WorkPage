import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from "react";
import LocalStorageNames from "../utils/localstorageNames";
import { useTranslation } from "react-i18next";

type SettingsContextProps = {
	background: string;
	setBackground: (newBackground: string) => void;
	settingsLanguage: string;
	changeSettingsLanguage: (newLang: string) => void;
	color: string;
	setColor: (newColor: string) => void;
	darkMode: boolean;
	changeDarkMode: (newMode: boolean) => void;
	wallpaperStyle: string;
	changeWallpaperStyle: (newStyle: string) => void;
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const { localSettingsBackground, localSettingsColor, localSettingsLanguage, localSettingsDarkMode, localSettingsWallpaperStyle } = useMemo(() => LocalStorageNames, []);
	const [background, setBackground] = useState("https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg");
	const [color, setColor] = useState("#CE17C5");
	const [darkMode, changeDarkMode] = useState(false);
	const [wallpaperStyle, changeWallpaperStyle] = useState("cover");
	const [settingsLanguage, changeSettingsLanguage] = useState("en");
	const { i18n } = useTranslation();

	useEffect(() => {
		const storedBackground = localStorage.getItem(localSettingsBackground);
		if (storedBackground) {
			setBackground(storedBackground);
		}

		const storedLanguage = localStorage.getItem(localSettingsLanguage);
		if (storedLanguage) {
			changeSettingsLanguage(storedLanguage);
		}

		const storedWallpaperStyle = localStorage.getItem(localSettingsWallpaperStyle);
		if (storedWallpaperStyle) {
			changeWallpaperStyle(storedWallpaperStyle);
		}

		const storedColor = localStorage.getItem(localSettingsColor);
		if (storedColor) {
			setColor(storedColor);
		}

		const storedMode = localStorage.getItem(localSettingsDarkMode);
		if (storedMode) {
			changeDarkMode(JSON.parse(storedMode));
		}
	}, [localSettingsBackground, localSettingsColor, localSettingsDarkMode, localSettingsWallpaperStyle, localSettingsLanguage]);

	useEffect(() => {
		localStorage.setItem(localSettingsBackground, background);
	}, [background, localSettingsBackground]);

	useEffect(() => {
		localStorage.setItem(localSettingsLanguage, settingsLanguage);
		i18n.changeLanguage(settingsLanguage);
	}, [settingsLanguage, localSettingsLanguage, i18n]);

	useEffect(() => {
		localStorage.setItem(localSettingsWallpaperStyle, wallpaperStyle);
	}, [wallpaperStyle, localSettingsWallpaperStyle]);

	useEffect(() => {
		localStorage.setItem(localSettingsColor, color);
	}, [color, localSettingsColor]);

	useEffect(() => {
		localStorage.setItem(localSettingsDarkMode, JSON.stringify(darkMode));
	}, [darkMode, localSettingsDarkMode]);

	return (
		<SettingsContext.Provider
			value={{
				background,
				settingsLanguage,
				changeSettingsLanguage,
				setBackground,
				setColor,
				color,
				darkMode,
				changeDarkMode,
				wallpaperStyle,
				changeWallpaperStyle,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettingsContext must be used within a SettingsProvider");
	}
	return context;
};
