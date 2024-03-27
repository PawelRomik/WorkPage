import { useCallback, useMemo, useState } from "react";
import Clock from "../../components/Clock/Clock";
import "./Login.style.scss";
import { useSettingsContext } from "../../providers/SettingsContext";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import LoginProfile from "../../components/LoginProfile/LoginProfile";
import { ToastContainer } from "react-toastify";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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

	const backgroundStyles = useMemo(
		() => css`
			& {
				background: linear-gradient(180deg, rgba(24, 24, 24, 0.2) 0%, black 100%);
			}
			&.loginScreen::before {
				background-image: url(${background});
				background-size: ${wallpaperStyle};
			}
		`,
		[background, wallpaperStyle]
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
					<LoginProfile handleLogin={handleLogin} />
				</>
			)}
		</main>
	);
};

export default Login;
