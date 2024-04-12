import { useState, useEffect, useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { clockStyles } from "./Clock.styles";

const Clock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const { settingsLanguage } = useSettingsContext();

	const clockValue = useMemo(() => {
		return currentTime.toLocaleTimeString(settingsLanguage || "en", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}, [currentTime, settingsLanguage]);

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	return (
		<div className='clock' css={clockStyles}>
			<p className='clockValue'>{clockValue}</p>
		</div>
	);
};

export default Clock;
