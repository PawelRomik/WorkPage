import { useState } from "react";
import Desktop from "../../components/Desktop/Desktop";
import Taskbar from "../../components/Taskbar/Taskbar";

const System = () => {
	const [userWindowState, changeUserWindowState] = useState(false);
	const [calendarWindowState, changeCalendarWindowState] = useState(false);
	const [soundbarWindowState, changeSoundbarWindowState] = useState(false);
	const [wifiWindowState, changeWifiWindowState] = useState(false);

	const displayUserWindowState = () => {
		changeUserWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeSoundbarWindowState(false);
		changeWifiWindowState(false);
	};

	const hideUserWindowState = () => {
		changeUserWindowState(false);
	};

	const displaySoundbarWindowState = () => {
		changeSoundbarWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeUserWindowState(false);
		changeWifiWindowState(false);
	};

	const hideSoundbarWindowState = () => {
		changeSoundbarWindowState(false);
	};

	const displayCalendarWindowState = () => {
		changeCalendarWindowState((prevState) => !prevState);
		changeUserWindowState(false);
		changeSoundbarWindowState(false);
		changeWifiWindowState(false);
	};

	const hideCalendarWindowState = () => {
		changeCalendarWindowState(false);
	};

	const displayWifiWindowState = () => {
		changeWifiWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeSoundbarWindowState(false);
		changeUserWindowState(false);
	};

	const hideWifiWindowState = () => {
		changeWifiWindowState(false);
	};

	return (
		<>
			<Desktop
				userWindowState={userWindowState}
				hideWifiWindowState={hideWifiWindowState}
				hideSoundbarWindowState={hideSoundbarWindowState}
				soundbarWindowState={soundbarWindowState}
				wifiWindowState={wifiWindowState}
				hideUserWindowState={hideUserWindowState}
				calendarWindowState={calendarWindowState}
				hideCalendarWindow={hideCalendarWindowState}
			/>
			<Taskbar
				displayUserWindowState={displayUserWindowState}
				displayCalendarWindow={displayCalendarWindowState}
				displaySoundbarWindow={displaySoundbarWindowState}
				displayWifiWindow={displayWifiWindowState}
			/>
		</>
	);
};

export default System;
