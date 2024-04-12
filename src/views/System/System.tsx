import { useCallback, useEffect, useState } from "react";
import Desktop from "../../components/Desktop/Desktop";
import Taskbar from "../../components/Taskbar/Taskbar";
import Login from "../Login/Login";
import { useLocation } from "react-router-dom";
import { fakeLoginStyles } from "./System.styles";
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
	const [chosenApp, changeChosenApp] = useState<App | null>(null);
	const [isOff, changeIsOff] = useState(false);
	const [loadingAnimation, changeLoadingAnimation] = useState(true);
	const location = useLocation();

	const displayUserWindowState = useCallback(() => {
		changeUserWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeSoundbarWindowState(false);
		changeWifiWindowState(false);
	}, []);

	const hideUserWindowState = useCallback(() => {
		changeUserWindowState(false);
	}, []);

	const displaySoundbarWindowState = useCallback(() => {
		changeSoundbarWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeUserWindowState(false);
		changeWifiWindowState(false);
	}, []);

	const hideSoundbarWindowState = useCallback(() => {
		changeSoundbarWindowState(false);
	}, []);

	const displayCalendarWindowState = useCallback(() => {
		changeCalendarWindowState((prevState) => !prevState);
		changeUserWindowState(false);
		changeSoundbarWindowState(false);
		changeWifiWindowState(false);
	}, []);

	const hideCalendarWindowState = useCallback(() => {
		changeCalendarWindowState(false);
	}, []);

	const displayWifiWindowState = useCallback(() => {
		changeWifiWindowState((prevState) => !prevState);
		changeCalendarWindowState(false);
		changeSoundbarWindowState(false);
		changeUserWindowState(false);
	}, []);

	const hideWifiWindowState = useCallback(() => {
		changeWifiWindowState(false);
	}, []);

	useEffect(() => {
		if (location && location?.state?.loginAnimation) {
			changeLoadingAnimation(location.state.loginAnimation);
			window.history.replaceState({}, "");
		} else {
			changeLoadingAnimation(false);
		}
	}, [location]);

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
				chosenApp={chosenApp}
				changeIsOff={changeIsOff}
			/>
		</>
	);
};

export default System;
