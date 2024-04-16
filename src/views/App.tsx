import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { System } from "./System/System";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Global } from "@emotion/react";
import { appStyles, swalStyles } from "./App.styles";
import { useSettingsContext } from "../providers/SettingsContext";

export const App = () => {
	const { darkMode, color } = useSettingsContext();
	return (
		<>
			<Global styles={[appStyles(color), swalStyles(darkMode, color)]} />
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route
						path='/system'
						element={
							<>
								<SignedIn>
									<System />
								</SignedIn>
								<SignedOut>
									<Login />
								</SignedOut>
							</>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};
