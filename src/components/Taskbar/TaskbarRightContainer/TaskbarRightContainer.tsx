import Clock from "../../Clock/Clock";
import { useMemo } from "react";
import { taskbarRightContainerStyles } from "./TaskbarRightContainer.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";

type TaskbarRightContainerProps = {
	displayCalendarWindow: () => void;
	displaySoundbarWindow: () => void;
	displayWifiWindow: () => void;
};

const TaskbarRightContainer = ({ displaySoundbarWindow, displayWifiWindow, displayCalendarWindow }: TaskbarRightContainerProps) => {
	const { darkMode, color, sound } = useSettingsContext();
	const volumeClass = useMemo(() => (sound < 10 ? "fa-volume-xmark" : sound < 70 ? "fa-volume-low" : "fa-volume-high"), [sound]);

	return (
		<div className='rightTaskbarContainer' css={taskbarRightContainerStyles(darkMode, color)}>
			<i className={`fa-solid ${volumeClass}`} onClick={displaySoundbarWindow}></i>
			<i className='fa-solid fa-wifi' onClick={displayWifiWindow}></i>
			<div className='taskbarTimer' onClick={displayCalendarWindow}>
				<Clock />
			</div>
		</div>
	);
};

export default TaskbarRightContainer;
