import { useState, useEffect, useMemo } from "react";
import "./Clock.style.scss";
const Clock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const clockValue = useMemo(() => `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`, [currentTime]);

	return (
		<div className='clock'>
			<p className='clockValue'>{clockValue}</p>
		</div>
	);
};

export default Clock;
