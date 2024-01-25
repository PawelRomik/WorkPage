import type { App } from "../Desktop";
import "./DesktopAppButton.style.scss";
import { useMemo } from "react";

type AppButtonProps = {
	app: App;
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const AppButton = ({ app, handleLaunchApp }: AppButtonProps) => {
	const { id, name, class: appClass } = useMemo(() => app, [app]);

	const buttonClass = useMemo(() => `app ${name === "Settings" ? "settings" : ""}`, [name]);
	const iconClass = useMemo(() => `${appClass} appIcon`, [appClass]);

	return (
		<button className={buttonClass} key={id} data-app={id} onClick={handleLaunchApp}>
			<i className={iconClass}></i>
			<p>{name}</p>
		</button>
	);
};

export default AppButton;
