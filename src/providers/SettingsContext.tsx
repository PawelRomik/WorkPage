import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import LocalStorageNames from "../utils/localstorageNames";

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
	sound: number;
	changeSound: (newSound: number) => void;
};

const { localSoundValue } = LocalStorageNames;

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [background, setBackground] = useState("");
	const [color, setColor] = useState("");
	const [darkMode, changeDarkMode] = useState(false);
	const [sound, changeSound] = useState(100);
	const [wallpaperStyle, changeWallpaperStyle] = useState("");
	const [settingsLanguage, changeSettingsLanguage] = useState("");
	const { user } = useUser();
	const { i18n } = useTranslation();

	useEffect(() => {
		const storedBackground =
			user?.unsafeMetadata.background || "https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg";
		if (storedBackground) {
			setBackground(storedBackground.toString());
		}

		const storedLanguage = user?.unsafeMetadata?.settingsLanguage?.toString() || "en";
		if (storedLanguage) {
			changeSettingsLanguage(storedLanguage);
			i18n.changeLanguage(storedLanguage);
		}

		const storedWallpaperStyle = user?.unsafeMetadata?.wallpaperStyle?.toString() || "cover";
		if (storedWallpaperStyle) {
			changeWallpaperStyle(storedWallpaperStyle);
		}

		const storedSound = Number(JSON.parse(localStorage.getItem(localSoundValue) || "100"));
		if (storedSound) {
			changeSound(storedSound);
		}

		const storedColor = user?.unsafeMetadata?.color?.toString() || "#CE17C5";
		if (storedColor) {
			setColor(storedColor);
		}

		const storedMode = user?.unsafeMetadata?.darkMode?.toString() || "false";
		if (storedMode) {
			changeDarkMode(JSON.parse(storedMode));
		}
	}, [user, i18n]);

	useEffect(() => {
		localStorage.setItem(localSoundValue, JSON.stringify(sound));
	}, [sound]);

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
				sound,
				changeSound,
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
