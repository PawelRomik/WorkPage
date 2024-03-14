import React from "react";
import "./LoginProfile.style.scss";
import avatar from "../../assets/loginAvatar.png";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";

type LoginProfileProps = {
	handleLogin: () => void;
	handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	password: string;
	loginInput: string;
	updateLoginInput: (value: string) => void;
};

const LoginProfile = ({ handleLogin, handleKeyPress, password, loginInput, updateLoginInput }: LoginProfileProps) => {
	const { t } = useTranslation();
	const { color } = useSettingsContext();
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
			<img src={avatar} alt='avatar' className='userAvatar' draggable={false} />
			<p className='user'>{t("LoginProfile.loginUser")}</p>
			<div className='loginPanel'>
				{password ? (
					<input
						type='password'
						value={loginInput}
						onChange={(e) => updateLoginInput(e.target.value)}
						placeholder='password'
						onKeyDown={handleKeyPress}
						aria-label='Type your password'
						className='passwordInput'
					></input>
				) : (
					<button className='loginJoinButton' aria-label='Login' onClick={handleLogin}>
						{t("LoginProfile.loginEnter")}
					</button>
				)}
				<button onClick={handleLogin} aria-label='Login' className='signInButton'>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</div>
		</div>
	);
};

export default LoginProfile;
