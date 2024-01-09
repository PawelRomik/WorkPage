import CurrentDate from "../CurrentDate/CurrentDate";
import Timer from "../Timer/Timer";
import "./CalendarWindow.style.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const CalendarWindow = () => {
	const dontHideOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className='calendarContainer' onClick={dontHideOnClick}>
			<section className='currentDateSection'>
				<Timer />
				<CurrentDate />
			</section>
			<section className='calendar'>
				<Calendar />
			</section>
		</div>
	);
};

export default CalendarWindow;
