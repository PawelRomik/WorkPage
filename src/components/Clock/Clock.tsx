import { useState, useEffect, useMemo } from "react";
import "./Clock.style.scss";
import { useSettingsContext } from "../../providers/SettingsContext";

const Clock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const { settingsLanguage } = useSettingsContext();

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const clockValue = useMemo(() => {
		return currentTime.toLocaleTimeString(settingsLanguage || "en", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}, [currentTime, settingsLanguage]);

	return (
		<div className='clock'>
			<p className='clockValue'>{clockValue}</p>
		</div>
	);
};

export default Clock;
