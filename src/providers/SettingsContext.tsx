import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from "react";
import LocalStorageNames from "../utils/localstorageNames";

type SettingsContextProps = {
	background: string;
	setBackground: (newBackground: string) => void;
	password: string;
	setPassword: (newPassword: string) => void;
	color: string;
	setColor: (newColor: string) => void;
	darkMode: boolean;
	changeDarkMode: (newMode: boolean) => void;
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const { localSettingsBackground, localSettingsPassword, localSettingsColor, localSettingsDarkMode } = useMemo(() => LocalStorageNames, []);
	const [background, setBackground] = useState("https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg");
	const [password, setPassword] = useState("");
	const [color, setColor] = useState("#CE17C5");
	const [darkMode, changeDarkMode] = useState(false);

	useEffect(() => {
		const storedBackground = localStorage.getItem(localSettingsBackground);
		if (storedBackground) {
			setBackground(storedBackground);
		}

		const storedPassword = localStorage.getItem(localSettingsPassword);
		if (storedPassword) {
			setPassword(storedPassword);
		}

		const storedColor = localStorage.getItem(localSettingsColor);
		if (storedColor) {
			setColor(storedColor);
		}

		const storedMode = localStorage.getItem(localSettingsDarkMode);
		if (storedMode) {
			changeDarkMode(JSON.parse(storedMode));
		}
	}, [localSettingsBackground, localSettingsColor, localSettingsDarkMode, localSettingsPassword]);

	useEffect(() => {
		localStorage.setItem(localSettingsBackground, background);
	}, [background, localSettingsBackground]);

	useEffect(() => {
		localStorage.setItem(localSettingsPassword, password);
	}, [password, localSettingsPassword]);

	useEffect(() => {
		localStorage.setItem(localSettingsColor, color);
	}, [color, localSettingsColor]);

	useEffect(() => {
		localStorage.setItem(localSettingsDarkMode, JSON.stringify(darkMode));
	}, [darkMode, localSettingsDarkMode]);

	return <SettingsContext.Provider value={{ background, setBackground, password, setPassword, setColor, color, darkMode, changeDarkMode }}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettingsContext must be used within a SettingsProvider");
	}
	return context;
};
