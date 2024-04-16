import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { launchToast } from "../../utils/toastFunction";
import { LocalStorageNames } from "../../utils/localstorageNames";
import { videoPlayerStyles } from "./VideoPlayer.styles";
import { useSettingsContext } from "../../providers/SettingsContext";
import nothumbnail from "../../assets/video/nothumbnail.png";
import { VideoContainer } from "./VideoContainer/VideoContainer";
import { VideoHistory } from "./VideoHistory/VideoHistory";
import { VideoInput } from "./VideoInput/VideoInput";
import { useTranslation } from "react-i18next";

const { localCurrentVideo, localVideoLength, localVideoHistory } = LocalStorageNames;

export type Video = {
	thumbnail: string;
	videoUrl: string;
};

export const VideoPlayer = () => {
	const [videoInputValue, setVideoInputValue] = useState("");
	const [currentVideoUrl, setCurrentVideoUrl] = useState("");
	const [videoData, setVideoData] = useState<Video[]>([]);
	const [videoHistory, setVideoHistory] = useState<string[]>([]);
	const { darkMode } = useSettingsContext();
	const [videoTime, setVideoTime] = useState(0);
	const { t } = useTranslation();

	const setVideo = useCallback(() => {
		if (ReactPlayer.canPlay(videoInputValue)) {
			if (!videoHistory.includes(videoInputValue)) {
				if (videoHistory.length >= 8) {
					const newVideoHistory = [videoInputValue, ...videoHistory.slice(0, 7)];
					setVideoHistory(newVideoHistory);
				} else {
					setVideoHistory([videoInputValue, ...videoHistory]);
				}
			}
			setCurrentVideoUrl(videoInputValue);
			setVideoInputValue("");
			setVideoTime(0);
			localStorage.setItem(localVideoLength, JSON.stringify(0));
		} else {
			setVideoInputValue("");
			launchToast("error", t("Player.noVideo"));
		}
	}, [videoInputValue, videoHistory, t]);

	const fetchThumbnail = useCallback(async (url: string) => {
		try {
			const videoResponse = await fetch(`${import.meta.env.VITE_NOEMBED_URL}/embed?url=${url}`);
			if (!videoResponse.ok) {
				throw new Error("Failed to fetch thumbnail");
			}

			const videoResult = await videoResponse.json();
			return { thumbnail: videoResult.thumbnail_url, videoUrl: url };
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		const fetchThumbnails = async () => {
			try {
				const thumbnailPromises = videoHistory.map((e) => fetchThumbnail(e));
				const thumbnailUrls = await Promise.all(thumbnailPromises);

				const videos: Video[] = thumbnailUrls.map((thumbnailUrl) => ({
					thumbnail: thumbnailUrl?.thumbnail || nothumbnail,
					videoUrl: thumbnailUrl?.videoUrl || "",
				}));

				setVideoData(videos);
			} catch (error) {
				console.error(error);
			}
		};

		fetchThumbnails();
	}, [videoHistory, fetchThumbnail]);

	useEffect(() => {
		const storedCurrVideo = localStorage.getItem(localCurrentVideo);
		if (storedCurrVideo) {
			setCurrentVideoUrl(JSON.parse(storedCurrVideo));
		}
	}, []);

	useEffect(() => {
		const storedVideoTime = localStorage.getItem(localVideoLength);
		if (storedVideoTime) {
			setVideoTime(JSON.parse(storedVideoTime));
		}
	}, []);

	useEffect(() => {
		const storedVideoHistory = localStorage.getItem(localVideoHistory);
		if (storedVideoHistory) {
			setVideoHistory(JSON.parse(storedVideoHistory));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(localCurrentVideo, JSON.stringify(currentVideoUrl));
	}, [currentVideoUrl]);

	useEffect(() => {
		localStorage.setItem(localVideoHistory, JSON.stringify(videoHistory));
	}, [videoHistory]);

	return (
		<div className='videoPlayer' css={videoPlayerStyles(darkMode)}>
			<VideoInput setVideo={setVideo} videoInputValue={videoInputValue} setVideoInputValue={setVideoInputValue} />
			<VideoContainer currentVideoUrl={currentVideoUrl} videoTime={videoTime} />
			<VideoHistory videoData={videoData} setCurrentVideoUrl={setCurrentVideoUrl} />
		</div>
	);
};
