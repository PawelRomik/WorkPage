import { useCallback, useMemo } from "react";
import type { App } from "../../../views/System/System";
import { appData } from "../../../data/appData";
import { taskbarCenterAppStyles } from "./TaskbarCenterApp.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";

type TaskbarCenterAppProps = {
	setIsOff: (newValue: boolean) => void;
	chosenApp: App;
};

export const TaskbarCenterApp = ({ setIsOff, chosenApp }: TaskbarCenterAppProps) => {
	const { darkMode, color } = useSettingsContext();

	const turnOffApp = useCallback(() => {
		setIsOff(true);
	}, [setIsOff]);

	const icon = useMemo(() => (chosenApp ? appData[chosenApp.id].class : ""), [chosenApp]);

	return (
		<div className='taskbarCenterApp' onClick={turnOffApp} css={taskbarCenterAppStyles(darkMode, color)}>
			<i className={icon}></i>
		</div>
	);
};
