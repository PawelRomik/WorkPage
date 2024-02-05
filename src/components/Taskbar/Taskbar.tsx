import Clock from "../Clock/Clock";
import "./Taskbar.style.scss";
import { useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";

type TaskbarProps = {
	displayUserWindowState: () => void;
	displayCalendarWindow: () => void;
};

const Taskbar = ({ displayUserWindowState, displayCalendarWindow }: TaskbarProps) => {
	const { color, darkMode } = useSettingsContext();

	const systemButtonStyles = useMemo(
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

	return (
		<footer className='taskbar' css={darkModeStyles}>
			<button className='systemButton' css={systemButtonStyles} onClick={displayUserWindowState}>
				<i className='fa-solid fa-fire'></i>
			</button>
			<div className='rightTaskbarContainer'>
				<i className='fa-solid fa-volume-high'></i>
				<i className='fa-solid fa-wifi'></i>
				<div className='taskbarTimer' onClick={displayCalendarWindow}>
					<Clock />
				</div>
			</div>
		</footer>
	);
};

export default Taskbar;
