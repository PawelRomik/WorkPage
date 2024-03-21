import "./Desktop.style.scss";
import { useCallback, useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import appData from "../../data/apps";
import AppContainer from "../AppContainer/AppContainer";
import UserWindow from "../UserWindow/UserWindow";
import CalendarWindow from "../CalendarWindow/CalendarWindow";
import DesktopApps from "./DesktopApps/DesktopApps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global, css } from "@emotion/react";
import Soundbar from "../Soundbar/Soundbar";
import Wifi from "../Wifi/Wifi";
import Weather from "../Weather/Weather";

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
	const { background, darkMode, wallpaperStyle, color } = useSettingsContext();

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

	const desktopStyles = useMemo(
		() => css`
			:root {
				--toastify-color-info: ${color};
				--toastify-color-success: ${color};
				--toastify-color-warning: ${color};
				--toastify-color-error: ${color};
			}
			background-image: url(${background});
			background-size: ${wallpaperStyle};
		`,
		[color, background, wallpaperStyle]
	);

	const swalStyles = useMemo(
		() => css`
			& .swal2-popup .swal2-styled:focus,
			& .swal2-close:focus,
			& .swal2-input:focus {
				box-shadow: none !important;
			}
			& .swal2-close:hover,
			& .swal2-close:focus {
				color: ${color} !important;
			}

			& .swal2-input:focus {
				border-color: ${color} !important;
			}

			& .swal2-actions button {
				color: ${darkMode ? "black" : "white"} !important;

				&:hover,
				&:focus {
					background-color: ${color} !important;
					color: white !important;
				}
			}
		`,
		[color, darkMode]
	);

	return (
		<main className='desktop' css={[desktopStyles, swalStyles]} onClick={hidePanels}>
			<div className='appWrapper'>
				<Global styles={desktopStyles} />
				<ToastContainer
					position='top-right'
					limit={2}
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
				<DesktopApps appData={appData} handleLaunchApp={handleLaunchApp} />
				<Weather />
			</div>
		</main>
	);
};

export default Desktop;
