import { useSettingsContext } from "../../../providers/SettingsContext";
import { taskbarSystemButtonStyles } from "./TaskbarSystemButton.styles";

type TaskbarSystemButtonProps = {
	displayUserWindowState: () => void;
};

export const TaskbarSystemButton = ({ displayUserWindowState }: TaskbarSystemButtonProps) => {
	const { darkMode, color } = useSettingsContext();

	return (
		<button className='systemButton' onClick={displayUserWindowState} css={taskbarSystemButtonStyles(darkMode, color)}>
			<i className='fa-solid fa-fire'></i>
		</button>
	);
};
