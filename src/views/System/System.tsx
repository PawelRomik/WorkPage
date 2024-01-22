import { useState } from "react";
import Desktop from "../../components/Desktop/Desktop";
import Taskbar from "../../components/Taskbar/Taskbar";

export default function System() {
	const [userWindowState, changeUserWindowState] = useState(false);
	const [calendarWindowState, changeCalendarWindowState] = useState(false);

	const displayUserWindowState = () => {
		changeUserWindowState((prevState) => !prevState);
	};

	const hideUserWindowState = () => {
		changeUserWindowState(false);
	};

	const displayCalendarWindow = () => {
		changeCalendarWindowState((prevState) => !prevState);
	};

	const hideCalendarWindow = () => {
		changeCalendarWindowState(false);
	};

	return (
		<>
			<Desktop userWindowState={userWindowState} hideUserWindowState={hideUserWindowState} calendarWindowState={calendarWindowState} hideCalendarWindow={hideCalendarWindow} />
			<Taskbar displayUserWindowState={displayUserWindowState} displayCalendarWindow={displayCalendarWindow} />
		</>
	);
}
