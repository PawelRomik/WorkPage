import { createContext, useState, useContext, ReactNode, useEffect } from "react";

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
	const [background, setBackground] = useState("https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg");
	const [password, setPassword] = useState("");
	const [color, setColor] = useState("#CE17C5");
	const [darkMode, changeDarkMode] = useState(true);

	useEffect(() => {
		const storedBackground = localStorage.getItem("background");
		if (storedBackground) {
			setBackground(storedBackground);
		}

		const storedPassword = localStorage.getItem("password");
		if (storedPassword) {
			setPassword(storedPassword);
		}

		const storedColor = localStorage.getItem("color");
		if (storedColor) {
			setColor(storedColor);
		}

		const storedMode = localStorage.getItem("darkMode");
		if (storedMode) {
			changeDarkMode(JSON.parse(storedMode));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("background", background);
	}, [background]);

	useEffect(() => {
		localStorage.setItem("password", password);
	}, [password]);

	useEffect(() => {
		localStorage.setItem("color", color);
	}, [color]);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	return <SettingsContext.Provider value={{ background, setBackground, password, setPassword, setColor, color, darkMode, changeDarkMode }}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettingsContext must be used within a SettingsProvider");
	}
	return context;
};
