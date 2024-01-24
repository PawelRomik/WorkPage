import React from "react";
import "./LoginProfile.style.scss";
import avatar from "../../assets/loginAvatar.png";

type LoginProfileProps = {
	handleLogin: () => void;
	handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	error: undefined | string;
	password: string;
	loginInput: string;
	updateLoginInput: (value: string) => void;
};

const LoginProfile = ({ handleLogin, handleKeyPress, error, password, loginInput, updateLoginInput }: LoginProfileProps) => {
	return (
		<div className='loginProfile'>
			<img src={avatar} alt='avatar' className='userAvatar' />
			<p className='user'>User</p>
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
						Enter
					</button>
				)}
				<button onClick={handleLogin} aria-label='Login' className='signInButton'>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</div>
			{error && <p className='loginError'>{error}</p>}
		</div>
	);
};

export default LoginProfile;
