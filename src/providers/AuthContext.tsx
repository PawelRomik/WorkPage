import { createContext, useContext, useEffect, ReactNode, useState, useMemo, useCallback } from "react";
import LocalStorageNames from "../utils/localstorageNames";

type AuthContextProps = {
	loggedIn: boolean;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { localLoggedIn } = useMemo(() => LocalStorageNames, []);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const loginStatus = JSON.parse(localStorage.getItem(localLoggedIn) || "false");
		setLoggedIn(loginStatus);
	}, [localLoggedIn]);

	const login = useCallback(() => {
		setLoggedIn(true);
		localStorage.setItem(localLoggedIn, JSON.stringify(true));
	}, [localLoggedIn]);

	const logout = useCallback(() => {
		setLoggedIn(false);
		localStorage.setItem(localLoggedIn, JSON.stringify(false));
	}, [localLoggedIn]);

	return <AuthContext.Provider value={{ loggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
