import { useSettingsContext } from "../../../providers/SettingsContext";
import type { App } from "../Desktop";
import "./DesktopAppButton.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";

type AppButtonProps = {
	app: App;
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const AppButton = ({ app, handleLaunchApp }: AppButtonProps) => {
	const { id, name, class: appClass } = useMemo(() => app, [app]);

	const buttonClass = useMemo(() => `app ${name === "Settings" ? "settings" : ""}`, [name]);
	const iconClass = useMemo(() => `${appClass} appIcon`, [appClass]);
	const { color } = useSettingsContext();

	const appStyles = useMemo(
		() => css`
			&:focus {
				background-color: ${color}33;
			}
		`,
		[color]
	);

	return (
		<button className={buttonClass} key={id} data-app={id} onClick={handleLaunchApp} css={appStyles}>
			<i className={iconClass}></i>
			<p>{name}</p>
		</button>
	);
};

export default AppButton;
