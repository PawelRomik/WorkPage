import Clock from "../Clock/Clock";
import "./Taskbar.style.scss";
import { useCallback, useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";
import type { App } from "../../views/System/System";
import appData from "../../data/apps";

type TaskbarProps = {
	displayUserWindowState: () => void;
	displayCalendarWindow: () => void;
	displaySoundbarWindow: () => void;
	displayWifiWindow: () => void;
	volume: number;
	changeIsOff: (newValue: boolean) => void;
	chosenApp: App | null;
};

const Taskbar = ({ displayUserWindowState, changeIsOff, chosenApp, displayCalendarWindow, displaySoundbarWindow, displayWifiWindow, volume }: TaskbarProps) => {
	const { color, darkMode } = useSettingsContext();

	const activeButtonStyles = useMemo(
		() => css`
			&:focus,
			&:hover {
				color: ${color} !important;
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.taskbar {
				background-color: ${darkMode ? "white" : "black"};

				.taskbarCenterApp {
					color: ${darkMode ? "black" : "white"};
					border-bottom: 2px solid ${color};

					&:hover,
					&:focus {
						background-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
						& i::after {
							color: ${color};
							width: 3rem;
							height: 3rem;
							display: flex;
							justify-content: center;
							align-items: center;
							content: "x";
							z-index: 3;
							font-weight: bold;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
				}

				.rightTaskbarContainer {
					color: ${darkMode ? "black" : "white"};
				}

				.systemButton {
					color: ${darkMode ? "black" : "white"};
				}

				.taskbarTimer {
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode, color]
	);

	const turnOffApp = useCallback(() => {
		changeIsOff(true);
	}, [changeIsOff]);

	const icon = useMemo(() => (chosenApp ? appData[chosenApp.id].class : ""), [chosenApp]);
	const volumeClass = useMemo(() => (volume < 10 ? "fa-volume-xmark" : volume < 70 ? "fa-volume-low" : "fa-volume-high"), [volume]);
	return (
		<footer className='taskbar' css={darkModeStyles}>
			<div className='taskbarWrapper'>
				<button className='systemButton' css={activeButtonStyles} onClick={displayUserWindowState}>
					<i className='fa-solid fa-fire'></i>
				</button>
				{chosenApp && (
					<div className='taskbarCenterApp' onClick={turnOffApp}>
						<i className={icon}></i>
					</div>
				)}
				<div className='rightTaskbarContainer'>
					<i className={`fa-solid ${volumeClass}`} css={activeButtonStyles} onClick={displaySoundbarWindow}></i>
					<i className='fa-solid fa-wifi' css={activeButtonStyles} onClick={displayWifiWindow}></i>
					<div className='taskbarTimer' onClick={displayCalendarWindow}>
						<Clock />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Taskbar;
