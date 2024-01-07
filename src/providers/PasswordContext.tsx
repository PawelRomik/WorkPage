import React, { createContext, useContext, ReactNode, useEffect } from "react";

interface PasswordContextProps {
	password: string;
	setPassword: (newPassword: string) => void;
}

const PasswordContext = createContext<PasswordContextProps | undefined>(undefined);

export const PasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [password, setPassword] = React.useState("");

	useEffect(() => {
		const storedPassword = localStorage.getItem("password");
		if (storedPassword) {
			setPassword(storedPassword);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("password", password);
	}, [password]);

	return <PasswordContext.Provider value={{ password, setPassword }}>{children}</PasswordContext.Provider>;
};

export const usePasswordContext = () => {
	const context = useContext(PasswordContext);
	if (!context) {
		throw new Error("usePasswordContext must be used within a PasswordProvider");
	}
	return context;
};
