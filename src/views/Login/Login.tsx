import { useCallback, useMemo, useState } from "react";
import Clock from "../../components/Clock/Clock";
import "./Login.style.scss";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useAuthContext } from "../../providers/AuthContext";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import LoginProfile from "../../components/LoginProfile/LoginProfile";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { css } from "@emotion/react";

type LoginProps = {
	loaded?: boolean;
};

const Login = ({ loaded }: LoginProps) => {
	const { login } = useAuthContext();
	const { password, darkMode, background, wallpaperStyle, color } = useSettingsContext();
	const [loading, setLoading] = useState(false);
	const [loginInput, setLoginInput] = useState("");
	const { changeLoggedInAnimation } = useAuthContext();

	const handleLogin = useCallback(() => {
		if (password === loginInput) {
			setLoading(true);
		} else {
			toast.error("Incorrect password");
		}
	}, [loginInput, password]);

	const animationEnd = useCallback(() => {
		setLoading(false);
		login();
		changeLoggedInAnimation(true);
	}, [login, changeLoggedInAnimation]);

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleLogin();
			}
		},
		[handleLogin]
	);

	const backgroundStyles = useMemo(
		() => css`
			& {
				background: linear-gradient(180deg, rgba(24, 24, 24, 0.2) 0%, ${color} 400%);
			}
			&.loginScreen::before {
				background-image: url(${background});
				background-size: ${wallpaperStyle};
			}
		`,
		[background, wallpaperStyle, color]
	);

	return (
		<main className={`loginScreen`} css={backgroundStyles}>
			<div className='loginTimer'>
				<Clock />
			</div>

			{loading || loaded ? (
				<LoadingAnimation animationEnd={animationEnd} repeats={2} />
			) : (
				<>
					<ToastContainer
						position='top-right'
						limit={2}
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover={false}
						theme={darkMode ? "light" : "dark"}
					/>
					<LoginProfile handleKeyPress={handleKeyPress} handleLogin={handleLogin} password={password} loginInput={loginInput} updateLoginInput={setLoginInput} />
				</>
			)}
		</main>
	);
};

export default Login;
