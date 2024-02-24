import { useCallback, useMemo } from "react";
import "./Wifi.style.scss";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

const Wifi = () => {
	const { color, darkMode } = useSettingsContext();

	const wifiStyles = useMemo(
		() => css`
			& {
				color: ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.wifiContainer {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};

				button {
					background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode]
	);

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	return (
		<div className='wifiContainer' css={darkModeStyles} onClick={dontHideOnClick}>
			<p>
				<i className='fa-solid fa-wifi' css={wifiStyles}></i>Connected
			</p>
		</div>
	);
};

export default Wifi;
