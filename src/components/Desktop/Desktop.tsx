import { useCallback } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import appData from "../../data/apps";
import AppContainer from "../AppContainer/AppContainer";
import UserWindow from "../UserWindow/UserWindow";
import CalendarWindow from "../CalendarWindow/CalendarWindow";
import DesktopApps from "./DesktopApps/DesktopApps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Soundbar from "../Soundbar/Soundbar";
import Wifi from "../Wifi/Wifi";
import Weather from "../Weather/Weather";
import { appWrapperStyles, desktopStyles } from "./Desktop.styles";
import type { App } from "../../views/System/System";

type DesktopProps = {
	userWindowState: boolean;
	calendarWindowState: boolean;
	wifiWindowState: boolean;
	soundbarWindowState: boolean;
	hideUserWindowState: () => void;
	hideCalendarWindow: () => void;
	hideSoundbarWindowState: () => void;
	hideWifiWindowState: () => void;
	volume: number;
	setVolume: (value: number) => void;
	chosenApp: App | null;
	changeChosenApp: (newApp: App | null) => void;
	isOff: boolean;
	changeIsOff: (newValue: boolean) => void;
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
	volume,
	setVolume,
	chosenApp,
	changeChosenApp,
	isOff,
	changeIsOff,
}: DesktopProps) => {
	const { background, darkMode, wallpaperStyle } = useSettingsContext();

	const launchApp = useCallback(
		(e: React.MouseEvent) => {
			const target = e.currentTarget as HTMLButtonElement;
			const id: number = Number(target.dataset.app);
			changeChosenApp(appData[id]);
		},
		[changeChosenApp]
	);

	const closeApp = useCallback(() => {
		if (isOff) {
			changeChosenApp(null);
			changeIsOff(false);
		}
	}, [isOff, changeChosenApp, changeIsOff]);

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

	return (
		<main className='desktop' css={desktopStyles(background, wallpaperStyle)} onClick={hidePanels}>
			<div className='appWrapper' css={appWrapperStyles}>
				<ToastContainer
					position='top-right'
					limit={1}
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover={false}
					theme={darkMode ? "light" : "dark"}
				/>
				{chosenApp && <AppContainer app={chosenApp} closeApp={closeApp} isOff={isOff} changeIsOff={changeIsOff} />}
				{userWindowState && <UserWindow />}
				{calendarWindowState && <CalendarWindow />}
				{soundbarWindowState && <Soundbar volume={volume} setVolume={setVolume} />}
				{wifiWindowState && <Wifi />}
				<DesktopApps handleLaunchApp={handleLaunchApp} />
				<Weather />
			</div>
		</main>
	);
};

export default Desktop;
