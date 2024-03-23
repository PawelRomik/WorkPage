import "./UserWindow.style.scss";
import { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";

const UserWindow = () => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const [isAnimated, changeIsAnimated] = useState(false);
	const { signOut, user } = useClerk();

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

	const logoutOnClick = useCallback(() => {
		changeIsAnimated(true);
	}, []);

	const logout = useCallback(() => {
		signOut();
	}, [signOut]);
	return (
		<div className='userWindow' css={darkModeStyles} onClick={dontHideOnClick}>
			{isAnimated && <div className='logOutAnimation' onAnimationEnd={logout}></div>}
			<p>{`${t("UserWindow.userWindowLoggedAs")} ${user?.username}`}</p>
			<button css={userWindowButtonStyles} onClick={logoutOnClick}>
				{t("UserWindow.userWindowLogout")}
			</button>
		</div>
	);
};

export default UserWindow;
