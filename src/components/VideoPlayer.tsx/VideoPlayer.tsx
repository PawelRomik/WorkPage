import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { launchToast } from "../../utils/toastFunction";
import LocalStorageNames from "../../utils/localstorageNames";
import { videoContainerSectionStyles, videoHistorySectionStyles, videoInputSectionStyles, videoPlayerStyles } from "./VideoPlayer.styles";
import { useSettingsContext } from "../../providers/SettingsContext";
import nothumbnail from "../../assets/video/nothumbnail.png";

const { localCurrentVideo, localVideoLength, localVideoHistory } = LocalStorageNames;

type Video = {
	thumbnail: string;
	videoUrl: string;
};

const VideoPlayer = () => {
	const [videoInputValue, changeVideoInputValue] = useState("");
	const [currentVideoUrl, changeCurrentVideoUrl] = useState("");
	const [videoData, setVideoData] = useState<Video[]>([]);
	const [videoHistory, changeVideoHistory] = useState<string[]>([]);
	const { darkMode, color } = useSettingsContext();
	const videoRef = useRef<ReactPlayer>(null);
	const [videoTime, changeVideoTime] = useState(0);

	const changeInputValueOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		changeVideoInputValue(e.target.value);
	}, []);

	const setVideo = useCallback(() => {
		if (ReactPlayer.canPlay(videoInputValue)) {
			if (!videoHistory.includes(videoInputValue) && currentVideoUrl != "") {
				if (videoHistory.length >= 8) {
					const newVideoHistory = [videoInputValue, ...videoHistory.slice(0, 7)];
					changeVideoHistory(newVideoHistory);
				} else {
					changeVideoHistory([videoInputValue, ...videoHistory]);
				}
			}
			changeCurrentVideoUrl(videoInputValue);
			changeVideoInputValue("");
			changeVideoTime(0);
			localStorage.setItem(localVideoLength, JSON.stringify(0));
		} else {
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

	const videoHistoryElements = Array.from({ length: 8 }, (_, index) => {
		if (index < videoData.length) {
			return (
				<div className='videoHistoryItem' key={index}>
					<img src={videoData[index].thumbnail} title='click to play' onClick={() => changeCurrentVideoUrl(videoData[index].videoUrl)} />
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

	const updateTime = useCallback(() => {
		if (videoRef.current) {
			const time = videoRef.current.getCurrentTime();
			localStorage.setItem(localVideoLength, JSON.stringify(time));
		}
	}, []);

	const setTime = useCallback(() => {
		if (videoRef.current) {
			videoRef.current.seekTo(videoTime);
		}
	}, [videoTime]);

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
	}, [videoHistory]);

	useEffect(() => {
		const storedCurrVideo = localStorage.getItem(localCurrentVideo);
		if (storedCurrVideo) {
			changeCurrentVideoUrl(JSON.parse(storedCurrVideo));
		}
	}, []);

	useEffect(() => {
		const storedVideoTime = localStorage.getItem(localVideoLength);
		if (storedVideoTime) {
			changeVideoTime(JSON.parse(storedVideoTime));
		}
	}, []);

	useEffect(() => {
		const storedVideoHistory = localStorage.getItem(localVideoHistory);
		if (storedVideoHistory) {
			changeVideoHistory(JSON.parse(storedVideoHistory));
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
			<section className='videoInputSection' css={videoInputSectionStyles(darkMode, color)}>
				<label htmlFor='videoInput'>Input Url:</label>
				<div>
					<input type='text' id='videoInput' placeholder='Url:' className='videoInput' value={videoInputValue} onChange={changeInputValueOnChange} />
					<button className='videoInputButton' onClick={setVideo}>
						<i className='fa-solid fa-arrow-right-to-bracket'></i>
					</button>
				</div>
			</section>
			<section className='videoContainerSection' css={videoContainerSectionStyles(darkMode)}>
				<div className='playerWrapper'>
					{currentVideoUrl ? (
						<ReactPlayer ref={videoRef} progressInterval={10000} onProgress={updateTime} onStart={setTime} url={currentVideoUrl} controls={true} width='100%' height='100%' />
					) : (
						"Please provide video url"
					)}
				</div>
			</section>
			<section className='videoHistorySection' css={videoHistorySectionStyles(darkMode, color)}>
				<p>History:</p>
				<div>{videoHistoryElements}</div>
			</section>
		</div>
	);
};

export default VideoPlayer;
