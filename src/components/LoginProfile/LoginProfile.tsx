import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useClerk } from "@clerk/clerk-react";
import avatar from "../../assets/login/loginAvatar.png";
import LoginPanel from "./LoginPanel/LoginPanel";
import { avatarStyles, loginProfileStyles, userNameStyles } from "./LoginProfile.styles";

type LoginProfileProps = {
	handleLogin: () => void;
};

const LoginProfile = ({ handleLogin }: LoginProfileProps) => {
	const { t } = useTranslation();
	const { color, darkMode } = useSettingsContext();
	const { user } = useClerk();

	const userAvatar = useMemo(() => user?.imageUrl || avatar, [user?.imageUrl]);
	const userName = useMemo(() => user?.username || t("LoginProfile.loginUser"), [user?.username, t]);

	return (
		<div className='loginProfile' css={loginProfileStyles}>
			<img src={userAvatar} alt='avatar' className='userAvatar' draggable={false} css={avatarStyles(darkMode, color)} />
			<p className='userName' css={userNameStyles}>
				{userName}
			</p>
			<LoginPanel handleLogin={handleLogin} />
		</div>
	);
};

export default LoginProfile;
