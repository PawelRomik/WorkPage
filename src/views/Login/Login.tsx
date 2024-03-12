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

const Login = () => {
	const { login } = useAuthContext();
	const { password, darkMode, background, wallpaperStyle } = useSettingsContext();
	const [loading, setLoading] = useState(false);
	const [loginInput, setLoginInput] = useState("");

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
	}, [login]);

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
			&.loginScreen::before {
				background-image: url(${background});
				background-size: ${wallpaperStyle};
			}
		`,
		[]
	);

	return (
		<main className='loginScreen' css={backgroundStyles}>
			<div className='loginTimer'>
				<Clock />
			</div>
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
			{loading ? (
				<LoadingAnimation animationEnd={animationEnd} repeats={2} />
			) : (
				<LoginProfile handleKeyPress={handleKeyPress} handleLogin={handleLogin} password={password} loginInput={loginInput} updateLoginInput={setLoginInput} />
			)}
		</main>
	);
};

export default Login;
