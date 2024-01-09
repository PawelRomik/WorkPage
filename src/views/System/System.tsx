import { useState } from "react";
import Desktop from "../../components/Desktop/Desktop";
import Taskbar from "../../components/Taskbar/Taskbar";

import "./System.style.scss";

export default function System() {
	const [userWindowState, changeUserWindowState] = useState(false);

	const displayUserWindowState = () => {
		changeUserWindowState(true);
	};

	const hideUserWindowState = () => {
		changeUserWindowState(false);
	};

	return (
		<>
			<Desktop userWindowState={userWindowState} hideUserWindowState={hideUserWindowState} />
			<Taskbar displayUserWindowState={displayUserWindowState} />
		</>
	);
}
