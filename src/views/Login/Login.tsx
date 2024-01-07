import { useState } from "react";
import avatar from "../../assets/loginAvatar.png";
import Timer from "../../components/Timer/Timer";
import "./Login.style.scss";
import { usePasswordContext } from "../../providers/PasswordContext";

interface LoginProps {
	onSuccessfulLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccessfulLogin }) => {
	const { password } = usePasswordContext();
	const [loading, setLoading] = useState(false);
	const [loginInput, updateLoginInput] = useState("");
	const [error, setError] = useState("");
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	const handleLogin = () => {
		if (password === loginInput) {
			setLoading(true);

			setTimeout(() => {
				setLoading(false);
				onSuccessfulLogin();
			}, 3000);
		} else {
			setError("Incorrect password");
		}
	};

	return (
		<main className='loginScreen'>
			{loading ? (
				<div>
					<div className='loginTimer'>
						<Timer />
					</div>
					<div className='lds-roller'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div className='loginProfile'>
					<div className='loginTimer'>
						<Timer />
					</div>
					<img src={avatar} alt='avatar' className='userAvatar' />
					<p className='user'>User</p>
					<div className='loginPanel'>
						{password ? (
							<input
								type='password'
								value={loginInput}
								onChange={(e) => updateLoginInput(e.target.value)}
								placeholder='password'
								onKeyPress={handleKeyPress}
								aria-label='Type your password'
								className='passwordInput'
							></input>
						) : (
							<button className='loginJoinButton' aria-label='Login' onClick={handleLogin}>
								Enter
							</button>
						)}
						<button onClick={handleLogin} aria-label='Login' className='signInButton'>
							<i className='fa-solid fa-arrow-right-to-bracket'></i>
						</button>
					</div>
					{error && <p className='loginError'>Incorrect Password</p>}
				</div>
			)}
		</main>
	);
};

export default Login;
