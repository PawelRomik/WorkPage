import { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { wifiContainerStyles } from "./Wifi.styles";

const Wifi = () => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const [ip, changeApi] = useState("");
	const [ipVisibility, changeIpVisibility] = useState(false);

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	useEffect(() => {
		const fetchIp = async () => {
			try {
				const locationResponse = await fetch(import.meta.env.VITE_GEOLOCATION_API_URL);
				if (!locationResponse.ok) {
					throw new Error("Failed to fetch location");
				}

				const locationResult = await locationResponse.json();
				changeApi(locationResult.ip);
			} catch (error) {
				console.error(error);
			}
		};
		fetchIp();
	}, []);

	return (
		<div className='wifiContainer' css={wifiContainerStyles(darkMode, color)} onClick={dontHideOnClick}>
			<div className='ipContainer'>
				<p>IP:</p>
				<p className='ipParagraph'>
					{!ipVisibility && (
						<div className='hideIpBlock' onClick={() => changeIpVisibility(true)}>
							{t("Wifi.showIp")}
						</div>
					)}
					<div onClick={() => changeIpVisibility(false)} title={t("Wifi.hideIp")}>
						{ip}
					</div>
				</p>
			</div>
			<p className='wifiConnected'>
				<i className='fa-solid fa-wifi'></i>
				{t("Wifi.wifiConnected")}
			</p>
		</div>
	);
};

export default Wifi;
