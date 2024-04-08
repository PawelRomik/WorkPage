import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../../providers/SettingsContext";
import type { Video } from "../VideoPlayer";
import { videoHistorySectionStyles } from "./VideoHistory.styles";
import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type VideoHistoryProps = {
	videoData: Video[];
	changeCurrentVideoUrl: (newUrl: string) => void;
};

const VideoHistory = ({ videoData, changeCurrentVideoUrl }: VideoHistoryProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	const showModal = useCallback(
		(index: number) => {
			withReactContent(Swal)
				.fire({
					title: t("Swal.swalTitle"),
					text: t("Player.videoChangeModal"),
					showCancelButton: true,
					confirmButtonColor: darkMode ? "#dfdfdf" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "#dfdfdf" : "rgb(27, 27, 27)",
					confirmButtonText: t("Swal.swalYes"),
					cancelButtonText: t("Swal.swalNo"),
					background: darkMode ? "white" : "black",
					color: darkMode ? "black" : "white",
					showCloseButton: true,
					target: ".notesContainer",
				})
				.then((result) => {
					if (result.isConfirmed) {
						changeCurrentVideoUrl(videoData[index].videoUrl);
					}
				});
		},
		[changeCurrentVideoUrl, darkMode, t, videoData]
	);

	const videoHistoryElements = useMemo(
		() =>
			Array.from({ length: 8 }, (_, index) => {
				if (index < videoData.length) {
					return (
						<div className='videoHistoryItem hasVideo' key={index}>
							<img src={videoData[index].thumbnail} title={t("Player.videoHistoryHoverText")} onClick={() => showModal(index)} />
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
		[videoData, t, showModal]
	);

	return (
		<section className='videoHistorySection' css={videoHistorySectionStyles(darkMode, color)}>
			<p>{t("Player.videoHistoryTitle")}</p>
			<div>{videoHistoryElements}</div>
		</section>
	);
};

export default VideoHistory;
