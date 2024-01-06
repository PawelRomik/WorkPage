import { useState } from "react";
import avatar from "../../assets/loginAvatar.png";
import Timer from "../../components/Timer/Timer";
import "./Login.style.scss";

interface LoginProps {
	onSuccessfulLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccessfulLogin }) => {
	const [loading, setLoading] = useState(false);
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	const handleLogin = () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			onSuccessfulLogin();
		}, 3000);
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
						<input type='password' placeholder='password' onKeyPress={handleKeyPress} aria-label='Type your password' className='passwordInput'></input>
						<button onClick={handleLogin} aria-label='Login' className='signInButton'>
							<i className='fa-solid fa-arrow-right-to-bracket'></i>
						</button>
					</div>
				</div>
			)}
		</main>
	);
};

export default Login;
