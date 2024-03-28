import "./Settings.style.scss";
import { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import SettingsWallpaperSection from "./SettingsWallpaperSection/SettingsWallpaperSection";
import SettingsPasswordSection from "./SettingsPasswordSection/SettingsPasswordSection";
import { toast } from "react-toastify";
import SettingsColorSection from "./SettingsColorsSection/SettingsColorsSection";
import { useMemo } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";

const Settings = () => {
	const { settingsLanguage, darkMode } = useSettingsContext();
	const [backgroundInputValue, setBackgroundInputValue] = useState("");
	const [darkModeInputValue, changeDarkModeInputValue] = useState("false");
	const { t, i18n } = useTranslation();
	const { user } = useUser();

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
		const mode = darkMode || false;
		changeDarkModeInputValue(mode.toString());
	}, [darkMode]);

	const changeBackground = useCallback(
		(e: React.MouseEvent) => {
			if (e.currentTarget.children.length > 0) {
				const firstChild = e.currentTarget.children[0];
				if (firstChild instanceof HTMLImageElement) {
					const imageSrc = firstChild.src;

					const updateUser = async () => {
						if (user) {
							await user.update({
								unsafeMetadata: {
									...user.unsafeMetadata,
									background: imageSrc,
								},
							});
						}
					};
					updateUser();
					toast.dismiss();
					toast.clearWaitingQueue();
					toast.success(t("Settings.toastChangedWallpaper"));
				}
			}
		},
		[user, t]
	);

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
				toast.dismiss();
				toast.clearWaitingQueue();
				toast.success(t("Settings.toastChangedWallpaper"));
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

	const handleColorChange = useCallback(
		(newColor: string) => {
			const updateUser = async () => {
				if (user) {
					await user.update({
						unsafeMetadata: {
							...user.unsafeMetadata,
							color: newColor,
						},
					});
				}
			};
			updateUser();
			toast.dismiss();
			toast.clearWaitingQueue();
			toast.success(t("Settings.toastChangedColor"));
		},
		[user, t]
	);

	const handleDarkModeChange = useCallback(() => {
		changeDarkModeInputValue((prevValue) => {
			const newValue = !JSON.parse(prevValue);
			return JSON.stringify(newValue);
		});
		const mode: boolean = !darkMode;
		const updateUser = async () => {
			if (user) {
				await user.update({
					unsafeMetadata: {
						...user.unsafeMetadata,
						darkMode: mode,
					},
				});
			}
		};
		updateUser();
	}, [user, darkMode]);

	const handleBackgroundInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundInputValue(e.target.value);
	}, []);

	const changeWallpaperStyleOnClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const chosenStyle = (e.target as HTMLButtonElement).textContent?.toLowerCase();

			if (chosenStyle) {
				const updateUser = async () => {
					if (user) {
						await user.update({
							unsafeMetadata: {
								...user.unsafeMetadata,
								wallpaperStyle: chosenStyle,
							},
						});
					}
				};
				updateUser();
				toast.dismiss();
				toast.clearWaitingQueue();
				toast.success(t("Settings.toastChangedWallpaperMode"));
			}
		},
		[t, user]
	);

	const changeLanguageOnChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			i18n.changeLanguage(e.target.value);
			const updateUser = async () => {
				if (user) {
					await user.update({
						unsafeMetadata: {
							...user.unsafeMetadata,
							settingsLanguage: e.target.value,
						},
					});
				}
			};
			updateUser();
		},
		[user, i18n]
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
