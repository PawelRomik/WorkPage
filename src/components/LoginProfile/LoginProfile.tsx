import "./LoginProfile.style.scss";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../providers/SettingsContext";
import { css } from "@emotion/react";
import { SignOutButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import avatar from "../../assets/loginAvatar.png";

type LoginProfileProps = {
	handleLogin: () => void;
};

const LoginProfile = ({ handleLogin }: LoginProfileProps) => {
	const { t } = useTranslation();
	const { color, darkMode } = useSettingsContext();
	const { user } = useClerk();
	const loginStyles = useMemo(
		() =>
			css`
				& .userAvatar {
					background: linear-gradient(200deg, ${color} 0%, black 100%);
				}

				& .loginJoinButton,
				& .signInButton,
				& .logoutButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border-color: ${darkMode ? "#dfdfdf" : "rgb(27,27,27)"};
				}

				& .userAvatar {
					border-color: ${darkMode ? "white" : "black"};
				}

				& .loginButtons {
					&:hover,
					&:focus {
						& .loginJoinButton,
						& .signInButton {
							color: white !important;
							background-color: ${color} !important;
						}
					}
				}

				& .logoutButton {
					&:hover,
					&:active {
						color: white !important;
						background-color: ${color} !important;
					}
				}
			`,
		[color, darkMode]
	);
	return (
		<div className='loginProfile' css={loginStyles}>
			<img src={user?.imageUrl || avatar} alt='avatar' className='userAvatar' draggable={false} />
			<p className='user'>{user?.username || t("LoginProfile.loginUser")}</p>
			<div className='loginPanel'>
				<SignedOut>
					<div className='loginButtons'>
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
					</div>
				</SignedOut>
				<SignedIn>
					<div className='loginButtons'>
						<button className='loginJoinButton' aria-label='Login' onClick={handleLogin}>
							{t("LoginProfile.loginEnter")}
						</button>
						<button onClick={handleLogin} aria-label='Login' className='signInButton'>
							<i className='fa-solid fa-arrow-right-to-bracket'></i>
						</button>
					</div>
					<SignOutButton>
						<button className='logoutButton' aria-label='Login' onClick={handleLogin}>
							{t("LoginProfile.logout")}
						</button>
					</SignOutButton>
				</SignedIn>
			</div>
		</div>
	);
};

export default LoginProfile;
