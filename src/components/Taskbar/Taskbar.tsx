import Timer from "../Timer/Timer";
import "./Taskbar.style.scss";

type TaskbarProps = {
	displayUserWindowState: () => void;
	displayCalendarWindow: () => void;
};

const Taskbar: React.FC<TaskbarProps> = ({ displayUserWindowState, displayCalendarWindow }) => {
	return (
		<footer className='taskbar'>
			<button className='systemButton' onClick={displayUserWindowState}>
				<i className='fa-solid fa-fire'></i>
			</button>
			<div className='rightTaskbarContainer'>
				<i className='fa-solid fa-volume-high'></i>
				<i className='fa-solid fa-wifi'></i>
				<div className='taskbarTimer' onClick={displayCalendarWindow}>
					<Timer />
				</div>
			</div>
		</footer>
	);
};

export default Taskbar;
