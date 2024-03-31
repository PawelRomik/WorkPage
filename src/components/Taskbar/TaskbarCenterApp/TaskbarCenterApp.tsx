import { useCallback, useMemo } from "react";
import type { App } from "../../../views/System/System";
import appData from "../../../data/apps";
import { taskbarCenterAppStyles } from "./TaskbarCenterApp.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";

type TaskbarCenterAppProps = {
	changeIsOff: (newValue: boolean) => void;
	chosenApp: App;
};

const TaskbarCenterApp = ({ changeIsOff, chosenApp }: TaskbarCenterAppProps) => {
	const { darkMode, color } = useSettingsContext();

	const turnOffApp = useCallback(() => {
		changeIsOff(true);
	}, [changeIsOff]);

	const icon = useMemo(() => (chosenApp ? appData[chosenApp.id].class : ""), [chosenApp]);

	return (
		<div className='taskbarCenterApp' onClick={turnOffApp} css={taskbarCenterAppStyles(darkMode, color)}>
			<i className={icon}></i>
		</div>
	);
};
export default TaskbarCenterApp;
