import "./Soundbar.style.scss";
import { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

const Soundbar = () => {
	const { color, darkMode } = useSettingsContext();
	const [volume, setVolune] = useState(50);

	const soundbarStyles = useMemo(
		() => css`
			&.soundbarSlider {
				color: ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.soundbar {
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

	const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setVolune(Number(e.target.value));
	}, []);

	return (
		<div className='soundbar' css={darkModeStyles} onClick={dontHideOnClick}>
			<label htmlFor='soundbarSlider'>Volume:</label>
			<div>
				<i className='fa-solid fa-volume-high'></i>{" "}
				<input css={soundbarStyles} type='range' min='1' max='100' value={volume} onChange={changeVolume} className='soundbarSlider' id='soundbarSlider' />
			</div>
		</div>
	);
};

export default Soundbar;
