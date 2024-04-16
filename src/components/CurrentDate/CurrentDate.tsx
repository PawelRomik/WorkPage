import { useCallback } from "react";
import { currentDateStyles } from "./CurrentDate.styles";

export const CurrentDate = () => {
	const getFormattedDate = useCallback(() => {
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();

		const formattedDay = day < 10 ? `0${day}` : `${day}`;
		const formattedMonth = month < 10 ? `0${month}` : `${month}`;

		return `${formattedDay}.${formattedMonth}.${year}`;
	}, []);

	return (
		<p className='currentDate' css={currentDateStyles}>
			{getFormattedDate()}
		</p>
	);
};
