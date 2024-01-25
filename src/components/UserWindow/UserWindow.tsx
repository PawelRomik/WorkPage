import "./UserWindow.style.scss";
import { useAuthContext } from "../../providers/AuthContext";
import { useCallback } from "react";

const UserWindow = () => {
	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const { logout } = useAuthContext();
	return (
		<div className='userWindow' onClick={dontHideOnClick}>
			<p>Logged as: User</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default UserWindow;
