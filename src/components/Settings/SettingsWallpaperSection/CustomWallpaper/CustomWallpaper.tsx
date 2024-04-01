import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { useClerk } from "@clerk/clerk-react";
import { launchToast } from "../../../../utils/toastFunction";
import { customWallpaperStyles } from "./CustomWallpaper.styles";
import { useSettingsContext } from "../../../../providers/SettingsContext";

const CustomWallpaper = () => {
	const { t } = useTranslation();
	const { user } = useClerk();
	const { darkMode, color } = useSettingsContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");

	const handleCustomWallpaper = useCallback(() => {
		if (backgroundInputValue) {
			const img = new Image();
			img.src = backgroundInputValue;
			img.onload = () => {
				const updateUser = async () => {
					if (user) {
						await user.update({
							unsafeMetadata: {
								...user.unsafeMetadata,
								background: backgroundInputValue,
							},
						});
					}
				};
				updateUser();
				setBackgroundInputValue("");
				launchToast("success", t("Settings.toastChangedWallpaper"));
			};
		}
	}, [backgroundInputValue, user, t]);

	const handleInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleCustomWallpaper();
			}
		},
		[handleCustomWallpaper]
	);

	const handleBackgroundInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundInputValue(e.target.value);
	}, []);

	return (
		<div className='wallpaperPanel' css={customWallpaperStyles(darkMode, color)}>
			<input
				className='wallpaperInput'
				type='text'
				name='wallpaperInput'
				value={backgroundInputValue}
				onChange={handleBackgroundInputChange}
				id='wallpaperInput'
				placeholder={t("Settings.settingsWallpaperInputText")}
				onKeyDown={handleInputKeyDown}
			></input>
			<button className='wallpaperConfirmButton' onClick={handleCustomWallpaper}>
				<i className='fa-solid fa-arrow-right-to-bracket'></i>
			</button>
		</div>
	);
};

export default CustomWallpaper;
