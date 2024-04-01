import wallpaperData from "../../../data/wallpapers";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useClerk } from "@clerk/clerk-react";
import { launchToast } from "../../../utils/toastFunction";
import CustomWallpaper from "./CustomWallpaper/CustomWallpaper";
import WallpaperStyles from "./WallpaperStyles/WallpaperStyles";
import { settingsWallpaperSectionStyles, wallpaperSelectionStyles } from "./SettingsWallpaperSection.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";

const SettingsWallpaperSection = () => {
	const { t } = useTranslation();
	const { user } = useClerk();
	const { darkMode } = useSettingsContext();

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
					launchToast("success", t("Settings.toastChangedWallpaper"));
				}
			}
		},
		[user, t]
	);

	const wallpapers = useMemo(
		() =>
			wallpaperData.map((el, i) => (
				<button key={i} className='wallpaperButton' onClick={changeBackground}>
					<img src={el} alt='wallpaper' />
				</button>
			)),
		[changeBackground]
	);

	return (
		<section className='changeWallpaperSection' css={settingsWallpaperSectionStyles}>
			<h2>{t("Settings.settingsWallpaperSet")}</h2>
			<div className='wallpaperSectionSettings'>
				<CustomWallpaper />
				<div className='wallpapersSelection' css={wallpaperSelectionStyles(darkMode)}>
					{wallpapers}
				</div>
				<WallpaperStyles />
			</div>
		</section>
	);
};

export default SettingsWallpaperSection;
