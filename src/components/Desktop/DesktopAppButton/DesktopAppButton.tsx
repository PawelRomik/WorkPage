import { useSettingsContext } from "../../../providers/SettingsContext";
import type { App } from "../Desktop";
import "./DesktopAppButton.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

type AppButtonProps = {
	app: App;
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const AppButton = ({ app, handleLaunchApp }: AppButtonProps) => {
	const { id, name, class: appClass } = useMemo(() => app, [app]);
	const { t } = useTranslation();

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
			<p>{t(`Apps.${name}`)}</p>
		</button>
	);
};

export default AppButton;
