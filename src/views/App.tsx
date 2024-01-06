import { useState } from "react";
import Login from "./Login/Login";
import Desktop from "./Desktop/Desktop";

export default function App() {
	const [loggedIn, changeLoggedIn] = useState(false);

	const login = () => {
		changeLoggedIn(true);
	};

	return loggedIn ? <Desktop /> : <Login onSuccessfulLogin={login} />;
}
