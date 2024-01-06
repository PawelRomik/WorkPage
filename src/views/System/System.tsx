import Desktop from "../../components/Desktop/Desktop";
import Taskbar from "../../components/Taskbar/Taskbar";
import "./System.style.scss";

export default function System() {
	return (
		<>
			<Desktop />
			<Taskbar />
		</>
	);
}
