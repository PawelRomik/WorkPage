import "./Soundbar.style.scss";
import { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

type SoundbarProps = {
	volume: number;
	setVolume: (value: number) => void;
};

const Soundbar = ({ volume, setVolume }: SoundbarProps) => {
	const { color, darkMode } = useSettingsContext();
	const [oldSoundVal, setOldSoundVal] = useState(volume);

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

	const changeVolume = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const volume = Number(e.target.value);
			setVolume(volume);
			setOldSoundVal(volume);
		},
		[setVolume]
	);

	const lowerVolumeOnIconClick = useCallback(() => {
		console.log(oldSoundVal);
		if (volume == 0) {
			setVolume(oldSoundVal == 0 ? 50 : oldSoundVal);
		} else {
			setVolume(0);
		}
	}, [setVolume, volume, oldSoundVal]);

	const volumeClass = useMemo(() => (volume < 10 ? "fa-volume-xmark" : volume < 70 ? "fa-volume-low" : "fa-volume-high"), [volume]);

	return (
		<div className='soundbar' css={darkModeStyles} onClick={dontHideOnClick}>
			<label htmlFor='soundbarSlider'>Volume:</label>
			<div>
				<i className={`fa-solid ${volumeClass}`} onClick={lowerVolumeOnIconClick}></i>{" "}
				<input css={soundbarStyles} type='range' min='0' max='100' value={volume} onChange={changeVolume} className='soundbarSlider' id='soundbarSlider' />
			</div>
		</div>
	);
};

export default Soundbar;
