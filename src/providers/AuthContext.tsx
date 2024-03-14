import { createContext, useContext, useEffect, ReactNode, useState, useMemo, useCallback } from "react";
import LocalStorageNames from "../utils/localstorageNames";

type AuthContextProps = {
	loggedIn: boolean;
	login: () => void;
	logout: () => void;
	loggedInAnimation: boolean;
	changeLoggedInAnimation: (newValue: boolean) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { localLoggedIn, localLoginAnimation } = useMemo(() => LocalStorageNames, []);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loggedInAnimation, changeLoggedInAnimation] = useState(false);

	useEffect(() => {
		const loginStatus = JSON.parse(localStorage.getItem(localLoggedIn) || "false");
		setLoggedIn(loginStatus);
	}, [localLoggedIn]);

	useEffect(() => {
		const loginAnimationStatus = JSON.parse(localStorage.getItem(localLoginAnimation) || "false");
		changeLoggedInAnimation(loginAnimationStatus);
	}, [localLoginAnimation]);

	useEffect(() => {
		localStorage.setItem(localLoginAnimation, JSON.stringify(loggedInAnimation));
	}, [loggedInAnimation, localLoginAnimation]);

	const login = useCallback(() => {
		setLoggedIn(true);
		localStorage.setItem(localLoggedIn, JSON.stringify(true));
	}, [localLoggedIn]);

	const logout = useCallback(() => {
		setLoggedIn(false);
		localStorage.setItem(localLoggedIn, JSON.stringify(false));
	}, [localLoggedIn]);

	return <AuthContext.Provider value={{ loggedIn, login, logout, loggedInAnimation, changeLoggedInAnimation }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
