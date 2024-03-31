import { useSettingsContext } from "../../../providers/SettingsContext";
import type { App } from "../../../views/System/System";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { desktopAppButtonStyles } from "./DesktopAppButton.styles";

type AppButtonProps = {
	app: App;
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const AppButton = ({ app, handleLaunchApp }: AppButtonProps) => {
	const { id, name, class: appClass } = useMemo(() => app, [app]);
	const { t } = useTranslation();
	const { color } = useSettingsContext();

	const buttonClass = useMemo(() => `desktopAppButton ${name === "Settings" ? "settings" : ""}`, [name]);
	const iconClass = useMemo(() => `${appClass} desktopAppIcon`, [appClass]);

	return (
		<button className={buttonClass} key={id} data-app={id} onClick={handleLaunchApp} css={desktopAppButtonStyles(color)}>
			<i className={iconClass}></i>
			<p>{t(`Apps.${name}`)}</p>
		</button>
	);
};

export default AppButton;
