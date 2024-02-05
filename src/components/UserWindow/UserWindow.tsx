import "./UserWindow.style.scss";
import { useAuthContext } from "../../providers/AuthContext";
import { useCallback, useMemo } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";

const UserWindow = () => {
	const { color, darkMode } = useSettingsContext();

	const userWindowButtonStyles = useMemo(
		() => css`
			&:hover,
			&:focus {
				background-color: ${color} !important;
				color: white !important;
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.userWindow {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};

				button {
					background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode]
	);

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const { logout } = useAuthContext();
	return (
		<div className='userWindow' css={darkModeStyles} onClick={dontHideOnClick}>
			<p>Logged as: User</p>
			<button css={userWindowButtonStyles} onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default UserWindow;
