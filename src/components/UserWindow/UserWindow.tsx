import "./UserWindow.style.scss";
import { useAuthContext } from "../../providers/AuthContext";
import { useCallback, useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

const UserWindow = () => {
	const { color } = useSettingsContext();

	const userWindowButtonStyles = useMemo(
		() => css`
			&:hover,
			&:focus {
				background-color: ${color};
			}
		`,
		[color]
	);

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const { logout } = useAuthContext();
	return (
		<div className='userWindow' onClick={dontHideOnClick}>
			<p>Logged as: User</p>
			<button css={userWindowButtonStyles} onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default UserWindow;
