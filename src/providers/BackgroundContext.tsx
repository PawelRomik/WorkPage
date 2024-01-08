import React, { createContext, useContext, ReactNode, useEffect } from "react";

interface BackgroundContextProps {
	background: string;
	setBackground: (newBackground: string) => void;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [background, setBackground] = React.useState("https://uhdwallpapers.org/uploads/converted/19/07/07/windows-10-hero-redesign-wallpaper-1920x1080_899885-mm-90.jpg");

	useEffect(() => {
		const storedBackground = localStorage.getItem("background");
		if (storedBackground) {
			setBackground(storedBackground);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("background", background);
	}, [background]);

	return <BackgroundContext.Provider value={{ background, setBackground }}>{children}</BackgroundContext.Provider>;
};

export const useBackgroundContext = () => {
	const context = useContext(BackgroundContext);
	if (!context) {
		throw new Error("useBackgroundContext must be used within a BackgroundProvider");
	}
	return context;
};
