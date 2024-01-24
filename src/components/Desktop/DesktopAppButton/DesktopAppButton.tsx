import type { App } from "../Desktop";
import "./DesktopAppButton.style.scss";

type AppButtonProps = {
	app: App;
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const AppButton = ({ app, handleLaunchApp }: AppButtonProps) => {
	const { id, name, class: appClass } = app;

	const buttonClass = `app ${name === "Settings" ? "settings" : ""}`;
	const iconClass = `${appClass} appIcon`;

	return (
		<button className={buttonClass} key={id} data-app={id} onClick={handleLaunchApp}>
			<i className={iconClass}></i>
			<p>{name}</p>
		</button>
	);
};

export default AppButton;
