import { useCallback } from "react";
import "./CurrentDate.style.scss";

const CurrentDate = () => {
	const getFormattedDate = useCallback((): string => {
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();

		const formattedDay = day < 10 ? `0${day}` : `${day}`;
		const formattedMonth = month < 10 ? `0${month}` : `${month}`;

		return `${formattedDay}.${formattedMonth}.${year}`;
	}, []);

	return <p className='currentDate'>{getFormattedDate()}</p>;
};

export default CurrentDate;
