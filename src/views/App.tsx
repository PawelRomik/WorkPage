import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import System from "./System/System";
import { useAuthContext } from "../providers/AuthContext";

const App = () => {
	const { loggedIn } = useAuthContext();

	const getRouteElement = (path: string) => {
		if (loggedIn && path === "/") {
			return <Navigate to='/system' />;
		}
		if (!loggedIn && path === "/system") {
			return <Navigate to='/' />;
		}
		return path === "/" ? <Login /> : <System />;
	};

	return (
		<Router>
			<Routes>
				<Route path='/' element={getRouteElement("/")} />
				<Route path='/system' element={getRouteElement("/system")} />
			</Routes>
		</Router>
	);
};

export default App;
