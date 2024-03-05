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

	const { color, darkMode, settingsLanguage } = useSettingsContext();

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

	const darkModeStyles = useMemo(
		() => css`
			&.calendarContainer {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};

				.currentDateSection .clockValue {
					color: ${darkMode ? "black" : "white"};
				}

				.react-calendar {
					background-color: ${darkMode ? "white !important" : "black !important"};

					& .react-calendar__month-view__weekdays__weekday {
						color: ${darkMode ? "black" : "white"};
					}

					& .react-calendar__month-view__days__day,
					& .react-calendar__navigation__label,
					& .react-calendar__navigation__arrow,
					.react-calendar__tile {
						color: ${darkMode ? "black" : "white"};
					}

					& .react-calendar__navigation {
						border-top: 2px solid ${darkMode ? "black" : "white"};
						border-bottom: 2px solid ${darkMode ? "black" : "white"};
					}

					& .react-calendar__tile--active:enabled:hover,
					.react-calendar__tile--active:enabled:focus,
					.react-calendar__tile:enabled:hover,
					.react-calendar__tile:enabled:focus,
					.react-calendar__navigation button:enabled:hover,
					.react-calendar__navigation button:enabled:focus,
					.react-calendar__navigation button:disabled {
						background-color: ${darkMode ? "black" : "white"};
						color: ${darkMode ? "white" : "black"};
					}

					& .react-calendar__month-view__days__day--neighboringMonth,
					.react-calendar__decade-view__years__year--neighboringDecade,
					.react-calendar__century-view__decades__decade--neighboringCentury {
						color: ${darkMode ? "lightgray" : "gray"};
					}
				}
			}
		`,
		[darkMode]
	);

	return (
		<div className='calendarContainer' onClick={dontHideOnClick} css={darkModeStyles}>
			<section className='currentDateSection' css={timeStyles}>
				<Clock />
				<CurrentDate />
			</section>
			<section className='calendar' css={calendarStyles}>
				<Calendar css={calendarStyles} locale={settingsLanguage} />
			</section>
		</div>
	);
};

export default CalendarWindow;
