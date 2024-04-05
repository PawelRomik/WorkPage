import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { launchToast } from "../../utils/toastFunction";
import LocalStorageNames from "../../utils/localstorageNames";
import { videoContainerSectionStyles, videoHistorySectionStyles, videoInputSectionStyles, videoPlayerStyles } from "./VideoPlayer.styles";
import { useSettingsContext } from "../../providers/SettingsContext";

const { localCurrentVideo } = LocalStorageNames;

type Video = {
	thumbnail: string;
	videoUrl: string;
};

const VideoPlayer = () => {
	const [videoInputValue, changeVideoInputValue] = useState("");
	const [currentVideoUrl, changeCurrentVideoUrl] = useState("");
	const [videoData, setVideoData] = useState<Video[]>([]);
	const [videoHistory, changeVideoHistory] = useState<string[]>([]);
	const { darkMode } = useSettingsContext();

	const changeInputValueOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		changeVideoInputValue(e.target.value);
	}, []);

	const setVideo = useCallback(() => {
		if (ReactPlayer.canPlay(videoInputValue)) {
			if (!videoHistory.includes(videoInputValue) && currentVideoUrl != "") {
				if (videoHistory.length >= 8) {
					const newVideoHistory = [...videoHistory.slice(0, 7), currentVideoUrl];
					changeVideoHistory(newVideoHistory);
				} else {
					changeVideoHistory([videoInputValue, ...videoHistory]);
				}
			}
			changeCurrentVideoUrl(videoInputValue);
			changeVideoInputValue("");
		} else {
			changeCurrentVideoUrl("");
			changeVideoInputValue("");
			launchToast("error", "Cannot find video with that url!");
		}
	}, [videoInputValue, videoHistory, currentVideoUrl]);

	const fetchThumbnail = async (url: string) => {
		try {
			const videoResponse = await fetch(`http://noembed.com/embed?url=${url}`);
			if (!videoResponse.ok) {
				throw new Error("Failed to fetch location");
			}

			const videoResult = await videoResponse.json();
			return { thumbnail: videoResult.thumbnail_url, videoUrl: url };
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchThumbnails = async () => {
			try {
				const thumbnailPromises = videoHistory.map((e) => fetchThumbnail(e));
				const thumbnailUrls = await Promise.all(thumbnailPromises);

				const videos: Video[] = thumbnailUrls.map((thumbnailUrl) => ({
					thumbnail: thumbnailUrl?.thumbnail || "",
					videoUrl: thumbnailUrl?.videoUrl || "",
				}));

				setVideoData(videos);
			} catch (error) {
				console.error(error);
			}
		};

		fetchThumbnails();
	}, [videoHistory]);

	const videoHistoryElements = Array.from({ length: 8 }, (_, index) => {
		if (index < videoData.length) {
			return (
				<div className='videoHistoryItem' key={index}>
					<img src={videoData[index].thumbnail} onClick={() => changeCurrentVideoUrl(videoData[index].videoUrl)} />
				</div>
			);
		} else {
			return (
				<div className='videoHistoryItem' key={index}>
					<p>
						<i className='fa-solid fa-circle-play'></i>
						No video found
					</p>
				</div>
			);
		}
	});

	useEffect(() => {
		const storedCurrVideo = localStorage.getItem(localCurrentVideo);
		if (storedCurrVideo) {
			changeCurrentVideoUrl(JSON.parse(storedCurrVideo));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(localCurrentVideo, JSON.stringify(currentVideoUrl));
	}, [currentVideoUrl]);

	return (
		<div className='videoPlayer' css={videoPlayerStyles(darkMode)}>
			<section className='videoInputSection' css={videoInputSectionStyles(darkMode)}>
				<label htmlFor='videoInput'>Input url:</label>
				<div>
					<input type='text' id='videoInput' className='videoInput' value={videoInputValue} onChange={changeInputValueOnChange} />
					<button onClick={setVideo}>Set</button>
				</div>
			</section>
			<section className='videoContainerSection' css={videoContainerSectionStyles}>
				<ReactPlayer url={currentVideoUrl} controls={true} height={200} width={300} />
			</section>
			<section className='videoHistorySection' css={videoHistorySectionStyles(darkMode)}>
				{videoHistoryElements}
			</section>
		</div>
	);
};

export default VideoPlayer;
