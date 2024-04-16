import { useCallback } from "react";
import { videoInputSectionStyles } from "./VideoInput.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";

type VideoInputProps = {
	setVideo: () => void;
	videoInputValue: string;
	setVideoInputValue: (newValue: string) => void;
};

export const VideoInput = ({ setVideo, videoInputValue, setVideoInputValue }: VideoInputProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	const changeInputValueOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setVideoInputValue(e.target.value);
		},
		[setVideoInputValue]
	);

	return (
		<section className='videoInputSection' css={videoInputSectionStyles(darkMode, color)}>
			<label htmlFor='videoInput'>{t("Player.inputPlaceholder")}</label>
			<div>
				<input type='text' id='videoInput' placeholder='Url:' className='videoInput' value={videoInputValue} onChange={changeInputValueOnChange} />
				<button className='videoInputButton' onClick={setVideo}>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</div>
		</section>
	);
};
