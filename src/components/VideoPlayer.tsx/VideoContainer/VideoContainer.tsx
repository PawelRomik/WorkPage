import ReactPlayer from "react-player";
import { useCallback, useRef } from "react";
import LocalStorageNames from "../../../utils/localstorageNames";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { videoContainerSectionStyles } from "./VideoContainer.styles";
import { useTranslation } from "react-i18next";

type VideoContainerProps = {
	videoTime: number;
	currentVideoUrl: string;
};

const { localVideoLength } = LocalStorageNames;

const VideoContainer = ({ videoTime, currentVideoUrl }: VideoContainerProps) => {
	const videoRef = useRef<ReactPlayer>(null);
	const { darkMode, sound } = useSettingsContext();
	const { t } = useTranslation();

	const updateTime = useCallback(() => {
		if (videoRef.current) {
			const time = videoRef.current.getCurrentTime();
			localStorage.setItem(localVideoLength, JSON.stringify(time));
		}
	}, [videoRef]);

	const setTime = useCallback(() => {
		if (videoRef.current) {
			videoRef.current.seekTo(videoTime);
		}
	}, [videoTime, videoRef]);

	return (
		<section className='videoContainerSection' css={videoContainerSectionStyles(darkMode)}>
			<div className='playerWrapper'>
				{currentVideoUrl ? (
					<ReactPlayer
						ref={videoRef}
						volume={sound / 100}
						progressInterval={10000}
						onProgress={updateTime}
						onStart={setTime}
						url={currentVideoUrl}
						controls={true}
						width='100%'
						height='100%'
					/>
				) : (
					t("Player.videoContainerNoVideo")
				)}
			</div>
		</section>
	);
};

export default VideoContainer;
