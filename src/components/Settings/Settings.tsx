import { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../providers/SettingsContext";
import { SettingsWallpaperSection } from "./SettingsWallpaperSection/SettingsWallpaperSection";
import { SettingsPasswordSection } from "./SettingsPasswordSection/SettingsPasswordSection";
import { SettingsColorSection } from "./SettingsColorsSection/SettingsColorsSection";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";
import { settingsContainerStyles } from "./Settings.styles";
import { launchToast } from "../../utils/toastFunction";

export const Settings = () => {
	const { settingsLanguage, darkMode } = useSettingsContext();
	const [darkModeInputValue, setDarkModeInputValue] = useState("false");
	const { t, i18n } = useTranslation();
	const { user } = useUser();

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
			launchToast("success", t("Settings.toastChangedColor"));
		},
		[user, t]
	);

	const handleDarkModeChange = useCallback(() => {
		setDarkModeInputValue((prevValue) => {
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

	useEffect(() => {
		const mode = darkMode || false;
		setDarkModeInputValue(mode.toString());
	}, [darkMode]);

	return (
		<div className='settingsContainer' css={settingsContainerStyles(darkMode)}>
			<SettingsPasswordSection />

			<SettingsColorSection
				handleColorChange={handleColorChange}
				handleDarkModeChange={handleDarkModeChange}
				darkModeInputValue={darkModeInputValue}
				changeLanguageOnChange={changeLanguageOnChange}
				settingsLanguage={settingsLanguage}
			/>
			<SettingsWallpaperSection />
		</div>
	);
};
