import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../../providers/SettingsContext";
import type { Video } from "../VideoPlayer";
import { videoHistorySectionStyles } from "./VideoHistory.styles";
import { useMemo } from "react";

type VideoHistoryProps = {
	videoData: Video[];
	changeCurrentVideoUrl: (newUrl: string) => void;
};

const VideoHistory = ({ videoData, changeCurrentVideoUrl }: VideoHistoryProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	const videoHistoryElements = useMemo(
		() =>
			Array.from({ length: 8 }, (_, index) => {
				if (index < videoData.length) {
					return (
						<div className='videoHistoryItem hasVideo' key={index}>
							<img src={videoData[index].thumbnail} title={t("Player.videoHistoryHoverText")} onClick={() => changeCurrentVideoUrl(videoData[index].videoUrl)} />
						</div>
					);
				} else {
					return (
						<div className='videoHistoryItem' key={index}>
							<p>
								<i className='fa-solid fa-circle-play'></i>
								{t("Player.videoHistoryNoVideo")}
							</p>
						</div>
					);
				}
			}),
		[changeCurrentVideoUrl, videoData, t]
	);

	return (
		<section className='videoHistorySection' css={videoHistorySectionStyles(darkMode, color)}>
			<p>{t("Player.videoHistoryTitle")}</p>
			<div>{videoHistoryElements}</div>
		</section>
	);
};

export default VideoHistory;
