import { useCallback } from "react";
import { videoInputSectionStyles } from "./VideoInput.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";

type VideoInputProps = {
	setVideo: () => void;
	videoInputValue: string;
	changeVideoInputValue: (newValue: string) => void;
};

const VideoInput = ({ setVideo, videoInputValue, changeVideoInputValue }: VideoInputProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	const changeInputValueOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			changeVideoInputValue(e.target.value);
		},
		[changeVideoInputValue]
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

export default VideoInput;
