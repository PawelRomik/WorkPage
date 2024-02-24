import "./Desktop.style.scss";
import { useCallback, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import appData from "../../data/apps";
import AppContainer from "../AppContainer/AppContainer";
import Weather from "../Weather/Weather";
import UserWindow from "../UserWindow/UserWindow";
import CalendarWindow from "../CalendarWindow/CalendarWindow";
import DesktopApps from "./DesktopApps/DesktopApps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import Soundbar from "../Soundbar/Soundbar";
import Wifi from "../Wifi/Wifi";

export type App = {
	id: number;
	name: string;
	class: string;
};

type DesktopProps = {
	userWindowState: boolean;
	calendarWindowState: boolean;
	wifiWindowState: boolean;
	soundbarWindowState: boolean;
	hideUserWindowState: () => void;
	hideCalendarWindow: () => void;
	hideSoundbarWindowState: () => void;
	hideWifiWindowState: () => void;
};

const Desktop = ({
	hideUserWindowState,
	userWindowState,
	calendarWindowState,
	hideCalendarWindow,
	wifiWindowState,
	soundbarWindowState,
	hideWifiWindowState,
	hideSoundbarWindowState,
}: DesktopProps) => {
	const { background, darkMode, wallpaperStyle } = useSettingsContext();
	const [chosenApp, changeChosenApp] = useState<App | null>(null);

	const launchApp = useCallback((e: React.MouseEvent) => {
		const target = e.currentTarget as HTMLButtonElement;
		const id: number = Number(target.dataset.app);
		changeChosenApp(appData[id]);
	}, []);

	const closeApp = useCallback(() => {
		changeChosenApp(null);
	}, []);

	const hidePanels = useCallback(() => {
		hideUserWindowState();
		hideCalendarWindow();
		hideSoundbarWindowState();
		hideWifiWindowState();
	}, [hideCalendarWindow, hideUserWindowState, hideSoundbarWindowState, hideWifiWindowState]);

	const handleLaunchApp = useCallback(
		(e: React.MouseEvent) => {
			launchApp(e);
		},
		[launchApp]
	);

	const desktopStyles = css`
		background-image: url(${background});
		background-size: ${wallpaperStyle};
	`;

	return (
		<main className='desktop' css={desktopStyles} onClick={hidePanels}>
			<ToastContainer
				position='top-right'
				limit={2}
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={darkMode ? "light" : "dark"}
			/>
			{chosenApp && <AppContainer app={chosenApp} closeApp={closeApp} />}
			{userWindowState && <UserWindow />}
			{calendarWindowState && <CalendarWindow />}
			{soundbarWindowState && <Soundbar />}
			{wifiWindowState && <Wifi />}
			<DesktopApps appData={appData} handleLaunchApp={handleLaunchApp} />
			<Weather />
		</main>
	);
};

export default Desktop;
