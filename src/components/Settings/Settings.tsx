import "./Settings.style.scss";
import { useCallback, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import SettingsWallpaperSection from "./SettingsWallpaperSection/SettingsWallpaperSection";
import SettingsPasswordSection from "./SettingsPasswordSection/SettingsPasswordSection";

const Settings = () => {
	const { setBackground, password, setPassword } = useSettingsContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const changeBackground = useCallback(
		(e: React.MouseEvent) => {
			if (e.currentTarget.children.length > 0) {
				const firstChild = e.currentTarget.children[0];
				if (firstChild instanceof HTMLImageElement) {
					const imageSrc = firstChild.src;
					setBackground(imageSrc);
				}
			}
		},
		[setBackground]
	);

	const handleCustomWallpaper = useCallback(() => {
		if (backgroundInputValue) {
			const img = new Image();
			img.src = backgroundInputValue;
			img.onload = () => {
				setBackground(backgroundInputValue);
				setBackgroundInputValue("");
			};
		}
	}, [backgroundInputValue, setBackground]);

	const handleInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleCustomWallpaper();
			}
		},
		[handleCustomWallpaper]
	);

	const unlock = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (newPassword.length > 0) {
				if (newPassword) {
					setPassword(newPassword);
					setNewPassword("");
					//toasty
					e.currentTarget.blur();
				}
			} else {
				//toasty
			}
		},
		[newPassword, setPassword]
	);

	const changePass = useCallback(() => {
		if (newPassword.length <= 0 || oldPassword.length <= 0) {
			//toasty
		} else if (oldPassword != password) {
			//toasty
		} else {
			setPassword(newPassword);
			setNewPassword("");
			setOldPassword("");
		}
	}, [newPassword, oldPassword, password, setPassword]);

	const handleBackgroundInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundInputValue(e.target.value);
	}, []);

	const handleOldPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setOldPassword(e.target.value);
	}, []);

	const handleNewPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	}, []);

	const unsetPass = useCallback(() => {
		setPassword("");
	}, [setPassword]);

	return (
		<div className='settingsContainer'>
			<SettingsPasswordSection
				password={password}
				newPassword={newPassword}
				oldPassword={oldPassword}
				unlock={unlock}
				changePass={changePass}
				unsetPass={unsetPass}
				handleNewPasswordChange={handleNewPasswordChange}
				handleOldPasswordChange={handleOldPasswordChange}
			/>
			<SettingsWallpaperSection
				changeBackground={changeBackground}
				backgroundInputValue={backgroundInputValue}
				handleInputKeyDown={handleInputKeyDown}
				handleCustomWallpaper={handleCustomWallpaper}
				handleBackgroundInputChange={handleBackgroundInputChange}
			/>
		</div>
	);
};

export default Settings;
