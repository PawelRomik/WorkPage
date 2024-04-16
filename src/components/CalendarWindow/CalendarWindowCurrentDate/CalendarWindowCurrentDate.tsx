import { useSettingsContext } from "../../../providers/SettingsContext";
import { Clock } from "../../Clock/Clock";
import { CurrentDate } from "../../CurrentDate/CurrentDate";
import { currentDateSectionStyles } from "./CalendarWindowCurrentDate.styles";

export const CalendarWindowCurrentDate = () => {
	const { darkMode, color } = useSettingsContext();
	return (
		<section className='currentDateSection' css={currentDateSectionStyles(darkMode, color)}>
			<Clock />
			<CurrentDate />
		</section>
	);
};
