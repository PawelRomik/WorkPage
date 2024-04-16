import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { LocalStorageNames } from "../utils/localstorageNames";
import { wallpapers } from "../assets/wallpapers";
type SettingsContextProps = {
	background: string;
	setBackground: (newBackground: string) => void;
	settingsLanguage: string;
	setSettingsLanguage: (newLang: string) => void;
	color: string;
	setColor: (newColor: string) => void;
	darkMode: boolean;
	setDarkMode: (newMode: boolean) => void;
	wallpaperStyle: string;
	setWallpaperStyle: (newStyle: string) => void;
	sound: number;
	setSound: (newSound: number) => void;
};

const { localSoundValue } = LocalStorageNames;

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [background, setBackground] = useState("");
	const [color, setColor] = useState("");
	const [darkMode, setDarkMode] = useState(false);
	const [sound, setSound] = useState(100);
	const [wallpaperStyle, setWallpaperStyle] = useState("");
	const [settingsLanguage, setSettingsLanguage] = useState("");
	const { user } = useUser();
	const { i18n } = useTranslation();

	useEffect(() => {
		const storedBackground = user?.unsafeMetadata.background || wallpapers[0];
		if (storedBackground) {
			setBackground(storedBackground.toString());
		}

		const storedLanguage = user?.unsafeMetadata?.settingsLanguage?.toString() || "en";
		if (storedLanguage) {
			setSettingsLanguage(storedLanguage);
			i18n.changeLanguage(storedLanguage);
		}

		const storedWallpaperStyle = user?.unsafeMetadata?.wallpaperStyle?.toString() || "cover";
		if (storedWallpaperStyle) {
			setWallpaperStyle(storedWallpaperStyle);
		}

		const storedSound = Number(JSON.parse(localStorage.getItem(localSoundValue) || "100"));
		if (storedSound) {
			setSound(storedSound);
		}

		const storedColor = user?.unsafeMetadata?.color?.toString() || "#CE17C5";
		if (storedColor) {
			setColor(storedColor);
		}

		const storedMode = user?.unsafeMetadata?.darkMode?.toString() || "false";
		if (storedMode) {
			setDarkMode(JSON.parse(storedMode));
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
				setSettingsLanguage,
				setBackground,
				setColor,
				color,
				darkMode,
				setDarkMode,
				wallpaperStyle,
				setWallpaperStyle,
				sound,
				setSound,
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
