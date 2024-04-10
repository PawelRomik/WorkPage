import { useSettingsContext } from "../../providers/SettingsContext";
import type { App } from "../../views/System/System";
import { taskbarStyles } from "./Taskbar.styles";
import TaskbarCenterApp from "./TaskbarCenterApp/TaskbarCenterApp";
import TaskbarRightContainer from "./TaskbarRightContainer/TaskbarRightContainer";
import TaskbarSystemButton from "./TaskbarSystemButton/TaskbarSystemButton";

type TaskbarProps = {
	displayUserWindowState: () => void;
	displayCalendarWindow: () => void;
	displaySoundbarWindow: () => void;
	displayWifiWindow: () => void;
	changeIsOff: (newValue: boolean) => void;
	chosenApp: App | null;
};

const Taskbar = ({ displayUserWindowState, changeIsOff, chosenApp, displayCalendarWindow, displaySoundbarWindow, displayWifiWindow }: TaskbarProps) => {
	const { darkMode } = useSettingsContext();

	return (
		<footer className='taskbar' css={taskbarStyles(darkMode)}>
			<div className='taskbarWrapper'>
				<TaskbarSystemButton displayUserWindowState={displayUserWindowState} />
				{chosenApp && <TaskbarCenterApp changeIsOff={changeIsOff} chosenApp={chosenApp} />}
				<TaskbarRightContainer displayCalendarWindow={displayCalendarWindow} displaySoundbarWindow={displaySoundbarWindow} displayWifiWindow={displayWifiWindow} />
			</div>
		</footer>
	);
};

export default Taskbar;
