import { css } from "@emotion/react";

export const calendarStyles = (color: string) => css`
	&.calendar {
		width: 90%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		flex: 2;
		color: ${color};
	}
`;

export const reactCalendarStyles = (darkMode: boolean, color: string) => css`
	&.react-calendar {
		height: 100%;
		min-height: 100%;
		max-height: 100%;
		border: none !important;
		background-color: ${darkMode ? "white !important" : "black !important"};

		& .react-calendar__month-view__days__day--weekend {
			color: inherit;
		}
		& .react-calendar__month-view__weekdays__weekday--weekend abbr,
		& .react-calendar__month-view__weekdays__weekday abbr {
			text-decoration: none !important;
		}

		& .react-calendar__tile--active,
		* .react-calendar__tile--hasActive {
			background-color: transparent;
		}

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
		& button.react-calendar__tile--now {
			background-color: ${color} !important;
			color: white !important;
		}
	}
`;
