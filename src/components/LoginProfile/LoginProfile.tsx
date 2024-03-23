import React from "react";
import "./LoginProfile.style.scss";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import avatar from "../../assets/loginAvatar.png";

type LoginProfileProps = {
	handleLogin: () => void;
	handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	password: string;
	loginInput: string;
	updateLoginInput: (value: string) => void;
};

const LoginProfile = ({ handleLogin }: LoginProfileProps) => {
	const { t } = useTranslation();
	const { color } = useSettingsContext();
	const { user } = useClerk();
	const loginStyles = useMemo(
		() =>
			css`
				& .userAvatar {
					background: linear-gradient(200deg, ${color} 0%, black 100%);
				}

				& .signInButton:hover,
				& .signInButton:focus {
					color: ${color} !important;
				}
			`,
		[color]
	);
	return (
		<div className='loginProfile' css={loginStyles}>
			<img src={user?.imageUrl || avatar} alt='avatar' className='userAvatar' draggable={false} />
			<p className='user'>{user?.username || t("LoginProfile.loginUser")}</p>
			<div className='loginPanel'>
				<SignedOut>
					<SignUpButton afterSignInUrl='/' afterSignUpUrl='/'>
						<button className='loginJoinButton' aria-label='Login'>
							{t("LoginProfile.loginIn")}
						</button>
					</SignUpButton>
					<SignUpButton afterSignInUrl='/' afterSignUpUrl='/'>
						<button aria-label='Login' className='signInButton'>
							<i className='fa-solid fa-arrow-right-to-bracket'></i>
						</button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<button className='loginJoinButton' aria-label='Login' onClick={handleLogin}>
						{t("LoginProfile.loginEnter")}
					</button>
					<button onClick={handleLogin} aria-label='Login' className='signInButton'>
						<i className='fa-solid fa-arrow-right-to-bracket'></i>
					</button>
				</SignedIn>
			</div>
		</div>
	);
};

export default LoginProfile;
