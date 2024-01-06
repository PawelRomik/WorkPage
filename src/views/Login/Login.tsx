import { useState } from "react";
import avatar from "../../assets/loginAvatar.png";
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
			) : (
				<div className='loginProfile'>
					<img src={avatar} alt='avatar' />
					<p>User</p>
					<div className='loginPanel'>
						<input placeholder='password' onKeyPress={handleKeyPress} aria-label='Type your password'></input>
						<button onClick={handleLogin} aria-label='Login'>
							Login
						</button>
					</div>
				</div>
			)}
		</main>
	);
};

export default Login;
