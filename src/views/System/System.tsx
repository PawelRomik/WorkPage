import { useCallback, useEffect, useState } from "react";
import { Desktop } from "../../components/Desktop/Desktop";
import { Taskbar } from "../../components/Taskbar/Taskbar";
import { Login } from "../Login/Login";
import { useLocation } from "react-router-dom";
import { fakeLoginStyles } from "./System.styles";
export type App = {
	id: number;
	name: string;
	class: string;
};

export const System = () => {
	const [userWindowState, setUserWindowState] = useState(false);
	const [calendarWindowState, setCalendarWindowState] = useState(false);
	const [soundbarWindowState, setSoundbarWindowState] = useState(false);
	const [wifiWindowState, setWifiWindowState] = useState(false);
	const [chosenApp, setChosenApp] = useState<App | null>(null);
	const [isOff, setIsOff] = useState(false);
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const location = useLocation();

	const displayUserWindowState = useCallback(() => {
		setUserWindowState((prevState) => !prevState);
		setCalendarWindowState(false);
		setSoundbarWindowState(false);
		setWifiWindowState(false);
	}, []);

	const hideUserWindowState = useCallback(() => {
		setUserWindowState(false);
	}, []);

	const displaySoundbarWindowState = useCallback(() => {
		setSoundbarWindowState((prevState) => !prevState);
		setCalendarWindowState(false);
		setUserWindowState(false);
		setWifiWindowState(false);
	}, []);

	const hideSoundbarWindowState = useCallback(() => {
		setSoundbarWindowState(false);
	}, []);

	const displayCalendarWindowState = useCallback(() => {
		setCalendarWindowState((prevState) => !prevState);
		setUserWindowState(false);
		setSoundbarWindowState(false);
		setWifiWindowState(false);
	}, []);

	const hideCalendarWindowState = useCallback(() => {
		setCalendarWindowState(false);
	}, []);

	const displayWifiWindowState = useCallback(() => {
		setWifiWindowState((prevState) => !prevState);
		setCalendarWindowState(false);
		setSoundbarWindowState(false);
		setUserWindowState(false);
	}, []);

	const hideWifiWindowState = useCallback(() => {
		setWifiWindowState(false);
	}, []);

	useEffect(() => {
		if (location && location?.state?.loginAnimation) {
			setLoadingAnimation(location.state.loginAnimation);
			window.history.replaceState({}, "");
		} else {
			setLoadingAnimation(false);
		}
	}, [location]);

	return (
		<>
			{loadingAnimation && (
				<div className='fakeLogin' css={fakeLoginStyles} onAnimationEnd={() => setLoadingAnimation(false)}>
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
				setChosenApp={setChosenApp}
				isOff={isOff}
				setIsOff={setIsOff}
			/>
			<Taskbar
				displayUserWindowState={displayUserWindowState}
				displayCalendarWindow={displayCalendarWindowState}
				displaySoundbarWindow={displaySoundbarWindowState}
				displayWifiWindow={displayWifiWindowState}
				chosenApp={chosenApp}
				setIsOff={setIsOff}
			/>
		</>
	);
};
