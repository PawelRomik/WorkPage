import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import System from "./System/System";
import { PasswordProvider } from "../providers/PasswordContext";
import { BackgroundProvider } from "../providers/BackgroundContext";

export default function App() {
	const [loggedIn, changeLoggedIn] = useState(false);

	const login = () => {
		changeLoggedIn(true);
	};

	const getRouteElement = (path: string) => {
		if (loggedIn && path === "/") {
			return <Navigate to='/system' />;
		}
		if (!loggedIn && path === "/system") {
			return <Navigate to='/' />;
		}
		return path === "/" ? <Login onSuccessfulLogin={login} /> : <System />;
	};

	return (
		<BackgroundProvider>
			<PasswordProvider>
				<Router>
					<Routes>
						<Route path='/' element={getRouteElement("/")} />
						<Route path='/system' element={getRouteElement("/system")} />
					</Routes>
				</Router>
			</PasswordProvider>
		</BackgroundProvider>
	);
}
