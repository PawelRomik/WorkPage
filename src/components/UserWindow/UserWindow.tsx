import "./UserWindow.style.scss";
import { useAuthContext } from "../../providers/AuthContext";

const dontHideOnClick = (e: React.MouseEvent) => {
	e.stopPropagation();
};
const UserWindow = () => {
	const { logout } = useAuthContext();
	return (
		<div className='userWindow' onClick={dontHideOnClick}>
			<p>Logged as: User</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default UserWindow;
