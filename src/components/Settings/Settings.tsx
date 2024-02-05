import "./Settings.style.scss";
import { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import SettingsWallpaperSection from "./SettingsWallpaperSection/SettingsWallpaperSection";
import SettingsPasswordSection from "./SettingsPasswordSection/SettingsPasswordSection";
import { toast } from "react-toastify";
import SettingsColorSection from "./SettingsColorsSection/SettingsColorsSection";

const Settings = () => {
	const { setBackground, password, setPassword, setColor, color, darkMode, changeDarkMode } = useSettingsContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");
	const [darkModeInputValue, changeDarkModeInputValue] = useState("true");
	const [colorInputValue, setColorInputValue] = useState(color);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	useEffect(() => {
		const color = localStorage.getItem("color");
		if (color) setColorInputValue(color);
	}, []);

	useEffect(() => {
		const mode = localStorage.getItem("darkMode");
		if (mode) changeDarkModeInputValue(JSON.parse(mode));
	}, []);

	const changeBackground = useCallback(
		(e: React.MouseEvent) => {
			if (e.currentTarget.children.length > 0) {
				const firstChild = e.currentTarget.children[0];
				if (firstChild instanceof HTMLImageElement) {
					const imageSrc = firstChild.src;
					setBackground(imageSrc);
					toast.success("Success!");
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
				toast.success("Success!");
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
					toast.success("Success!");
					e.currentTarget.blur();
				}
			} else {
				toast.error("Please provide the password!");
			}
		},
		[newPassword, setPassword]
	);

	const changePass = useCallback(() => {
		if (newPassword.length <= 0 || oldPassword.length <= 0) {
			toast.error("Please provide the password!");
		} else if (oldPassword != password) {
			toast.error("Old password doesn't match!");
		} else {
			setPassword(newPassword);
			setNewPassword("");
			setOldPassword("");
			toast.success("Success!");
		}
	}, [newPassword, oldPassword, password, setPassword]);

	const handleColorChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setColorInputValue(e.target.value);
			setColor(colorInputValue);
		},
		[colorInputValue, setColor]
	);

	const handleDarkModeChange = useCallback(() => {
		changeDarkModeInputValue((prevValue) => {
			const newValue = !JSON.parse(prevValue);
			return JSON.stringify(newValue);
		});
		const mode: boolean = !darkMode;
		changeDarkMode(mode);
	}, [changeDarkMode, changeDarkModeInputValue, darkMode]);

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
		toast.success("Success!");
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

			<SettingsColorSection
				colorInputValue={colorInputValue}
				handleColorChange={handleColorChange}
				handleDarkModeChange={handleDarkModeChange}
				darkModeInputValue={darkModeInputValue}
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
