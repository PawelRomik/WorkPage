import Clock from "../Clock/Clock";
import "./Taskbar.style.scss";
import { useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";

type TaskbarProps = {
	displayUserWindowState: () => void;
	displayCalendarWindow: () => void;
	displaySoundbarWindow: () => void;
	displayWifiWindow: () => void;
	volume: number;
};

const Taskbar = ({ displayUserWindowState, displayCalendarWindow, displaySoundbarWindow, displayWifiWindow, volume }: TaskbarProps) => {
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
		[darkMode]
	);

	const volumeClass = useMemo(() => (volume < 10 ? "fa-volume-xmark" : volume < 70 ? "fa-volume-low" : "fa-volume-high"), [volume]);

	return (
		<footer className='taskbar' css={darkModeStyles}>
			<button className='systemButton' css={activeButtonStyles} onClick={displayUserWindowState}>
				<i className='fa-solid fa-fire'></i>
			</button>
			<div className='rightTaskbarContainer'>
				<i className={`fa-solid ${volumeClass}`} css={activeButtonStyles} onClick={displaySoundbarWindow}></i>
				<i className='fa-solid fa-wifi' css={activeButtonStyles} onClick={displayWifiWindow}></i>
				<div className='taskbarTimer' onClick={displayCalendarWindow}>
					<Clock />
				</div>
			</div>
		</footer>
	);
};

export default Taskbar;
