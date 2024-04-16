import Calendar from "react-calendar";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { calendarStyles } from "./CalendarWindowCalendar.styles";
import { reactCalendarStyles } from "./CalendarWindowCalendar.styles";

export const CalendarWindowCalendar = () => {
	const { darkMode, color, settingsLanguage } = useSettingsContext();

	return (
		<section className='calendar' css={calendarStyles(color)}>
			<Calendar css={reactCalendarStyles(darkMode, color)} locale={settingsLanguage} />
		</section>
	);
};
