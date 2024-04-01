import { useEffect, useState } from "react";
import Desktop from "../../components/Desktop/Desktop";
import LocalStorageNames from "../../utils/localstorageNames";
import Taskbar from "../../components/Taskbar/Taskbar";
import Login from "../Login/Login";
import { useLocation } from "react-router-dom";
import { fakeLoginStyles } from "./System.styles";
export type App = {
	id: number;
	name: string;
	class: string;
};

const { localSoundValue } = LocalStorageNames;

const System = () => {
	const [userWindowState, changeUserWindowState] = useState(false);
	const [calendarWindowState, changeCalendarWindowState] = useState(false);
	const [soundbarWindowState, changeSoundbarWindowState] = useState(false);
	const [wifiWindowState, changeWifiWindowState] = useState(false);
	const [volume, setVolume] = useState(50);
	const [chosenApp, changeChosenApp] = useState<App | null>(null);
	const [isOff, changeIsOff] = useState(false);
	const [loadingAnimation, changeLoadingAnimation] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const storedSoundValue = localStorage.getItem(localSoundValue);
		if (storedSoundValue) {
			setVolume(JSON.parse(storedSoundValue));
		}
	}, []);

	useEffect(() => {
		if (location && location?.state?.loginAnimation) {
			changeLoadingAnimation(location.state.loginAnimation);
			window.history.replaceState({}, "");
		} else {
			changeLoadingAnimation(false);
		}
	}, [location]);

	useEffect(() => {
		localStorage.setItem(localSoundValue, JSON.stringify(volume));
	}, [volume]);

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
			{loadingAnimation && (
				<div className='fakeLogin' css={fakeLoginStyles} onAnimationEnd={() => changeLoadingAnimation(false)}>
					<Login loaded={true} />
				</div>
			)}
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
