import { SignOutButton } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { logoutButtonStyles } from "./LoginPanelSignedIn.styles";
import { useSettingsContext } from "../../../../providers/SettingsContext";

type LoginPanelSignedInProps = {
	handleLogin: () => void;
};

export const LoginPanelSignedIn = ({ handleLogin }: LoginPanelSignedInProps) => {
	const { t } = useTranslation();
	const { darkMode, color } = useSettingsContext();

	return (
		<>
			<div className='loginButtons'>
				<button className='loginJoinButton' aria-label='Login' onClick={handleLogin}>
					{t("LoginProfile.loginEnter")}
				</button>
				<button onClick={handleLogin} aria-label='Login' className='signInButton'>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</div>
			<SignOutButton>
				<button className='logoutButton' aria-label='Login' onClick={handleLogin} css={logoutButtonStyles(darkMode, color)}>
					{t("LoginProfile.logout")}
				</button>
			</SignOutButton>
		</>
	);
};
