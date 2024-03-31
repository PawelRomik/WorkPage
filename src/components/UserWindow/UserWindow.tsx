import { useCallback, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { userWindowStyles } from "./UserWindow.styles";
import UserWindowLogoutAnimation from "./UserWindowLogoutAnimation/UserWindowLogoutAnimation";

const UserWindow = () => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const [isAnimated, changeIsAnimated] = useState(false);
	const { user } = useClerk();

	const dontHideOnClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const playLogoutAnimation = useCallback(() => {
		changeIsAnimated(true);
	}, []);

	return (
		<div className='userWindow' css={userWindowStyles(darkMode, color)} onClick={dontHideOnClick}>
			<p>{`${t("UserWindow.userWindowLoggedAs")} ${user?.username}`}</p>
			<button onClick={playLogoutAnimation}>{t("UserWindow.userWindowLogout")}</button>
			{isAnimated && <UserWindowLogoutAnimation />}
		</div>
	);
};

export default UserWindow;
