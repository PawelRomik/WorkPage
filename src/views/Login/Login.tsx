import { useCallback, useState } from "react";
import Clock from "../../components/Clock/Clock";
import "./Login.style.scss";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useAuthContext } from "../../providers/AuthContext";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import LoginProfile from "../../components/LoginProfile/LoginProfile";

const Login = () => {
	const { login } = useAuthContext();
	const { password } = useSettingsContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<undefined | string>(undefined);
	const [loginInput, setLoginInput] = useState("");

	const handleLogin = useCallback(() => {
		if (password === loginInput) {
			setLoading(true);

			setTimeout(() => {
				setLoading(false);
				login();
			}, 3000);
		} else {
			setError("Incorrect password");
		}
	}, [login, loginInput, password]);

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleLogin();
			}
		},
		[handleLogin]
	);

	return (
		<main className='loginScreen'>
			<div className='loginTimer'>
				<Clock />
			</div>
			{loading ? (
				<LoadingAnimation />
			) : (
				<LoginProfile handleKeyPress={handleKeyPress} handleLogin={handleLogin} error={error} password={password} loginInput={loginInput} updateLoginInput={setLoginInput} />
			)}
		</main>
	);
};

export default Login;
