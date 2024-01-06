import Timer from "../Timer/Timer";
import "./Taskbar.style.scss";

export default function Taskbar() {
	return (
		<footer className='taskbar'>
			<button className='windowsButton'>
				<i className='fa-brands fa-windows'></i>
			</button>
			<div className='rightTaskbarContainer'>
				<i className='fa-solid fa-volume-high'></i>
				<i className='fa-solid fa-wifi'></i>
				<div className='taskbarTimer'>
					<Timer />
				</div>
			</div>
		</footer>
	);
}
