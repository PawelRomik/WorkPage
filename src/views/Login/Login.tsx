import { useCallback, useState } from "react";
import Clock from "../../components/Clock/Clock";
import { useSettingsContext } from "../../providers/SettingsContext";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import LoginProfile from "../../components/LoginProfile/LoginProfile";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginStyles } from "./Login.styles";

type LoginProps = {
	loaded?: boolean;
};

const Login = ({ loaded }: LoginProps) => {
	const { darkMode, background, wallpaperStyle } = useSettingsContext();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = useCallback(() => {
		setLoading(true);
	}, []);

	const animationEnd = useCallback(() => {
		setLoading(false);
		navigate("/system", {
			state: {
				loginAnimation: true,
			},
		});
	}, [navigate]);

	return (
		<main className='loginScreen' css={loginStyles(background, wallpaperStyle)}>
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
					<LoginProfile handleLogin={handleLogin} />
				</>
			)}
		</main>
	);
};

export default Login;
