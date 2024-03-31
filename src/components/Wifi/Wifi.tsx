import { useCallback } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { wifiContainerStyles } from "./Wifi.styles";

const Wifi = () => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	return (
		<div className='wifiContainer' css={wifiContainerStyles(darkMode, color)} onClick={dontHideOnClick}>
			<p>
				<i className='fa-solid fa-wifi'></i>
				{t("Wifi.wifiConnected")}
			</p>
		</div>
	);
};

export default Wifi;
