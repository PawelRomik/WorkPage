import React, { createContext, useContext, ReactNode, useEffect } from "react";

interface SettingsContextProps {
	background: string;
	setBackground: (newBackground: string) => void;
	password: string;
	setPassword: (newPassword: string) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [background, setBackground] = React.useState("https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg");
	const [password, setPassword] = React.useState("");

	useEffect(() => {
		const storedBackground = localStorage.getItem("background");
		if (storedBackground) {
			setBackground(storedBackground);
		}

		const storedPassword = localStorage.getItem("password");
		if (storedPassword) {
			setPassword(storedPassword);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("background", background);
	}, [background]);

	useEffect(() => {
		localStorage.setItem("password", password);
	}, [password]);

	return <SettingsContext.Provider value={{ background, setBackground, password, setPassword }}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettingsContext must be used within a SettingsProvider");
	}
	return context;
};
