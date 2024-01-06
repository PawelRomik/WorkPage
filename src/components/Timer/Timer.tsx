import { useState, useEffect } from "react";
import "./Timer.style.scss";
const Timer = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	return (
		<div className='timer'>
			<p className='timerValue'>{`${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}`}</p>
		</div>
	);
};

export default Timer;
