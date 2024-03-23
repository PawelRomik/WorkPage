import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import System from "./System/System";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
	return (
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
	);
};

export default App;
