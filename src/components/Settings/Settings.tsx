import "./Settings.style.scss";
import wallpaperData from "../../data/wallpapers";
import { useState } from "react";
import { usePasswordContext } from "../../providers/PasswordContext";
import { useBackgroundContext } from "../../providers/BackgroundContext";

function Settings() {
	const { setBackground } = useBackgroundContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");

	const { password, setPassword } = usePasswordContext();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const [error, changeErrorStatus] = useState("");

	const wallpapers = wallpaperData.map((el, i) => (
		<button key={i} className='wallpaperButton' onClick={(e) => changeBackground(e)}>
			<img src={el} alt='wallpaper' />
		</button>
	));

	const changeBackground = (e: React.MouseEvent) => {
		if (e.currentTarget.children.length > 0) {
			const firstChild = e.currentTarget.children[0];
			if (firstChild instanceof HTMLImageElement) {
				const imageSrc = firstChild.src;
				setBackground(imageSrc);
			}
		}
	};

	const handleCustomWallpaper = () => {
		if (backgroundInputValue) {
			const img = new Image();
			img.src = backgroundInputValue;
			img.onload = () => {
				setBackground(backgroundInputValue);
				setBackgroundInputValue("");
			};
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleCustomWallpaper();
		}
	};

	const unlock = () => {
		if (newPassword.length > 0) {
			if (newPassword) {
				setPassword(newPassword);
				setNewPassword("");
				changeErrorStatus("Password succesfully set");
				setTimeout(() => {
					changeErrorStatus("");
				}, 3000);
			}
		} else {
			changeErrorStatus("Please enter the password");
		}
	};

	const changePass = () => {
		if (newPassword.length <= 0 || oldPassword.length <= 0) {
			changeErrorStatus("Please enter the password");
		} else if (oldPassword != password) {
			changeErrorStatus("Old password doesn't match");
		} else {
			setPassword(newPassword);
			setNewPassword("");
			setOldPassword("");
			changeErrorStatus("Password succesfully changed");
			setTimeout(() => {
				changeErrorStatus("");
			}, 3000);
		}
	};

	const unsetPass = () => {
		setPassword("");
	};

	return (
		<div className='settingsContainer'>
			<section className='changePasswordSection'>
				<h2>SET YOUR PASSWORD</h2>
				{error && <p className='error'>{error}</p>}
				<div className='passContainer'>
					{password && (
						<input
							className='changePasswordInput'
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							type='password'
							id='oldpassword'
							name='oldpassword'
							placeholder='Old password'
						/>
					)}
					<input
						className='changePasswordInput'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						placeholder='New Password'
					/>

					<div className='changePasswordButton'>
						<button className='unlockButton' onClick={password ? changePass : unlock}>
							Confirm
						</button>
						{password && (
							<button className='removeButton' onClick={unsetPass}>
								Remove password
							</button>
						)}
					</div>
				</div>
			</section>
			<section className='changeWallpaperSection'>
				<h2>SET YOUR WALLPAPER</h2>

				<div className='wallpaperPanel'>
					<input
						className='wallpaperInput'
						type='text'
						name='wallpaperInput'
						value={backgroundInputValue}
						onChange={(e) => setBackgroundInputValue(e.target.value)}
						id='wallpaperInput'
						placeholder={`Custom wallpaper: (url)`}
						onKeyDown={handleInputKeyDown}
					></input>
					<button className='wallpaperConfirmButton' onClick={handleCustomWallpaper}>
						<i className='fa-solid fa-arrow-right-to-bracket'></i>
					</button>
				</div>

				<div className='wallpapersSelection'>{wallpapers}</div>
			</section>
		</div>
	);
}

export default Settings;
