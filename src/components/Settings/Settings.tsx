import "./Settings.style.scss";
import { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import SettingsWallpaperSection from "./SettingsWallpaperSection/SettingsWallpaperSection";
import SettingsPasswordSection from "./SettingsPasswordSection/SettingsPasswordSection";
import { toast } from "react-toastify";
import SettingsColorSection from "./SettingsColorsSection/SettingsColorsSection";
import { useMemo } from "react";
import { css } from "@emotion/react";
import LocalStorageNames from "../../utils/localstorageNames";
import { useTranslation } from "react-i18next";

const Settings = () => {
	const { setBackground, settingsLanguage, changeSettingsLanguage, setColor, darkMode, changeDarkMode, changeWallpaperStyle } = useSettingsContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");
	const [darkModeInputValue, changeDarkModeInputValue] = useState("false");
	const { t } = useTranslation();
	const { localSettingsDarkMode } = useMemo(() => LocalStorageNames, []);

	const darkModeStyles = useMemo(
		() => css`
			&.settingsContainer {
				background-color: ${darkMode ? "lightgray" : "rgb(27, 27, 27)"};
				color: ${darkMode ? "black" : "white"};

				&::-webkit-scrollbar {
					width: 8px;
				}

				&::-webkit-scrollbar-thumb {
					background-color: ${darkMode ? "darkgray" : "black"};
				}

				&::-webkit-scrollbar-track {
					background-color: ${darkMode ? "white" : "rgb(12, 12, 12)"};
				}
			}
		`,
		[darkMode]
	);

	useEffect(() => {
		const mode = localStorage.getItem(localSettingsDarkMode);
		if (mode) changeDarkModeInputValue(JSON.parse(mode));
	}, [localSettingsDarkMode]);

	const changeBackground = useCallback(
		(e: React.MouseEvent) => {
			if (e.currentTarget.children.length > 0) {
				const firstChild = e.currentTarget.children[0];
				if (firstChild instanceof HTMLImageElement) {
					const imageSrc = firstChild.src;
					setBackground(imageSrc);
					toast.success(t("Settings.toastChangedWallpaper"));
				}
			}
		},
		[setBackground, t]
	);

	const handleCustomWallpaper = useCallback(() => {
		if (backgroundInputValue) {
			const img = new Image();
			img.src = backgroundInputValue;
			img.onload = () => {
				setBackground(backgroundInputValue);
				setBackgroundInputValue("");
				toast.success(t("Settings.toastChangedWallpaper"));
			};
		}
	}, [backgroundInputValue, setBackground, t]);

	const handleInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleCustomWallpaper();
			}
		},
		[handleCustomWallpaper]
	);

	const handleColorChange = useCallback(
		(newColor: string) => {
			setColor(newColor);
			toast.success(t("Settings.toastChangedColor"));
		},
		[setColor, t]
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

	const changeWallpaperStyleOnClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const chosenStyle = (e.target as HTMLButtonElement).textContent?.toLowerCase();
			if (chosenStyle) {
				changeWallpaperStyle(chosenStyle);
				toast.success(t("Settings.toastChangedWallpaperMode"));
			}
		},
		[changeWallpaperStyle, t]
	);

	const changeLanguageOnChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			changeSettingsLanguage(e.target.value);
		},
		[changeSettingsLanguage]
	);

	return (
		<div className='settingsContainer' css={darkModeStyles}>
			<SettingsPasswordSection />

			<SettingsColorSection
				handleColorChange={handleColorChange}
				handleDarkModeChange={handleDarkModeChange}
				darkModeInputValue={darkModeInputValue}
				changeLanguageOnChange={changeLanguageOnChange}
				settingsLanguage={settingsLanguage}
			/>
			<SettingsWallpaperSection
				changeBackground={changeBackground}
				backgroundInputValue={backgroundInputValue}
				handleInputKeyDown={handleInputKeyDown}
				handleCustomWallpaper={handleCustomWallpaper}
				handleBackgroundInputChange={handleBackgroundInputChange}
				changeWallpaperStyleOnClick={changeWallpaperStyleOnClick}
			/>
		</div>
	);
};

export default Settings;
