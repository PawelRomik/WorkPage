import { useEffect, useState, useMemo } from "react";
import Desktop from "../../components/Desktop/Desktop";
import LocalStorageNames from "../../utils/localstorageNames";
import Taskbar from "../../components/Taskbar/Taskbar";
export type App = {
	id: number;
	name: string;
	class: string;
};

const System = () => {
	const [userWindowState, changeUserWindowState] = useState(false);
	const [calendarWindowState, changeCalendarWindowState] = useState(false);
	const [soundbarWindowState, changeSoundbarWindowState] = useState(false);
	const [wifiWindowState, changeWifiWindowState] = useState(false);
	const [volume, setVolume] = useState(50);
	const { localSoundValue } = useMemo(() => LocalStorageNames, []);
	const [chosenApp, changeChosenApp] = useState<App | null>(null);
	const [isOff, changeIsOff] = useState(false);

	useEffect(() => {
		const storedSoundValue = localStorage.getItem(localSoundValue);
		if (storedSoundValue) {
			setVolume(JSON.parse(storedSoundValue));
		}
	}, [localSoundValue]);

	useEffect(() => {
		localStorage.setItem(localSoundValue, JSON.stringify(volume));
	}, [volume, localSoundValue]);

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
				volume={volume}
				setVolume={setVolume}
				chosenApp={chosenApp}
				changeChosenApp={changeChosenApp}
				isOff={isOff}
				changeIsOff={changeIsOff}
			/>
			<Taskbar
				displayUserWindowState={displayUserWindowState}
				displayCalendarWindow={displayCalendarWindowState}
				displaySoundbarWindow={displaySoundbarWindowState}
				displayWifiWindow={displayWifiWindowState}
				volume={volume}
				chosenApp={chosenApp}
				changeIsOff={changeIsOff}
			/>
		</>
	);
};

export default System;
