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
	const loginStyles = useMemo(() => {
		const getSecondColor = (color: string) => {
			const parsedColor = parseInt(color.substring(1), 16);

			let newColor = (parsedColor ^ 0xffffff).toString(16);
			while (newColor.length < 6) {
				newColor = "0" + newColor;
			}
			return "#" + newColor;
		};

		const lighterColor = getSecondColor(color);

		return css`
			& .userAvatar {
				background: linear-gradient(225deg, ${color} 0%, ${lighterColor} 100%);
			}

			& .signInButton:hover,
			& .signInButton:focus {
				color: ${color} !important;
			}
		`;
	}, [color]);
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
