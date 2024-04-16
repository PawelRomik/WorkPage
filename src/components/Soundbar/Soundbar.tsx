import { useCallback, useMemo, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { soundbarSliderStyles, soundbarStyles } from "./Soundbar.styles";

export const Soundbar = () => {
	const { color, darkMode, sound, setSound } = useSettingsContext();
	const [oldSoundVal, setOldSoundVal] = useState(0);
	const { t } = useTranslation();

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const changeVolume = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const volume = Number(e.target.value);
			setOldSoundVal(sound);
			setSound(volume);
		},
		[sound, setSound]
	);

	const lowerVolumeOnIconClick = useCallback(() => {
		if (sound == 0) {
			setSound(oldSoundVal);
		} else {
			setOldSoundVal(sound);
			setSound(0);
		}
	}, [oldSoundVal, setSound, sound]);

	const volumeClass = useMemo(() => (sound < 10 ? "fa-volume-xmark" : sound < 70 ? "fa-volume-low" : "fa-volume-high"), [sound]);

	return (
		<div className='soundbar' css={soundbarStyles(darkMode)} onClick={dontHideOnClick}>
			<label htmlFor='soundbarSlider'>{t("Volume.volume")}:</label>
			<div>
				<i className={`fa-solid ${volumeClass}`} onClick={lowerVolumeOnIconClick}></i>{" "}
				<input css={soundbarSliderStyles(color)} type='range' min='0' max='100' value={sound} onChange={changeVolume} className='soundbarSlider' id='soundbarSlider' />
			</div>
		</div>
	);
};
