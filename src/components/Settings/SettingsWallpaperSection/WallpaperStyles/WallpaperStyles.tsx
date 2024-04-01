import { useTranslation } from "react-i18next";
import { launchToast } from "../../../../utils/toastFunction";
import { useClerk } from "@clerk/clerk-react";
import { useCallback } from "react";
import { useSettingsContext } from "../../../../providers/SettingsContext";
import { wallpaperStylesStyles } from "./WallpaperStyles.styles";

const WallpaperStyles = () => {
	const { t } = useTranslation();
	const { user } = useClerk();
	const { wallpaperStyle, darkMode, color } = useSettingsContext();

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
				launchToast("success", t("Settings.toastChangedWallpaperMode"));
			}
		},
		[t, user]
	);

	return (
		<div className='wallpapersStyle' css={wallpaperStylesStyles(darkMode, color)}>
			<button className={`wallpapersStyleButton ${wallpaperStyle === "auto" ? "chosenWallpaperStyle" : ""}`} onClick={changeWallpaperStyleOnClick}>
				{t("Settings.settingsWallpaperModeAuto")}
			</button>
			<button className={`wallpapersStyleButton ${wallpaperStyle === "cover" ? "chosenWallpaperStyle" : ""}`} onClick={changeWallpaperStyleOnClick}>
				{t("Settings.settingsWallpaperModeCover")}
			</button>
			<button className={`wallpapersStyleButton ${wallpaperStyle === "contain" ? "chosenWallpaperStyle" : ""}`} onClick={changeWallpaperStyleOnClick}>
				{t("Settings.settingsWallpaperModeContain")}
			</button>
		</div>
	);
};

export default WallpaperStyles;
