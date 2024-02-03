import CurrentDate from "../CurrentDate/CurrentDate";
import Clock from "../Clock/Clock";
import "./CalendarWindow.style.scss";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useCallback, useMemo } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";

const CalendarWindow = () => {
	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const { color } = useSettingsContext();

	const calendarStyles = useMemo(
		() => css`
			&.calendar {
				color: ${color};
			}

			button.react-calendar__tile--now {
				background-color: ${color} !important;
				color: white !important;
			}
		`,
		[color]
	);

	const timeStyles = useMemo(
		() => css`
			.currentDate {
				color: ${color};
			}
		`,
		[color]
	);

	return (
		<div className='calendarContainer' onClick={dontHideOnClick}>
			<section className='currentDateSection' css={timeStyles}>
				<Clock />
				<CurrentDate />
			</section>
			<section className='calendar' css={calendarStyles}>
				<Calendar css={calendarStyles} />
			</section>
		</div>
	);
};

export default CalendarWindow;
