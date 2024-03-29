import wallpaperData from "../../../data/wallpapers";
import { useMemo } from "react";
import "./SettingsWallpaperSection.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

type SettingsWallpaperSectionProps = {
	changeBackground: (e: React.MouseEvent) => void;
	backgroundInputValue: string;
	handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	handleCustomWallpaper: () => void;
	handleBackgroundInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	changeWallpaperStyleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SettingsWallpaperSection = ({
	changeBackground,
	backgroundInputValue,
	handleInputKeyDown,
	handleCustomWallpaper,
	handleBackgroundInputChange,
	changeWallpaperStyleOnClick,
}: SettingsWallpaperSectionProps) => {
	const { color, darkMode, wallpaperStyle } = useSettingsContext();
	const { t } = useTranslation();

	const wallpaperConfirmButtonStyles = useMemo(
		() => css`
			& button:focus,
			& button:hover {
				color: ${color} !important;
			}

			& .wallpaperInput:focus {
				border: 2px solid ${color} !important;
				border-right: none !important;

				& ~ .wallpaperConfirmButton {
					border: 2px solid ${color} !important;
					border-left: none !important;
				}
			}

			& .wallpapersStyleButton:focus,
			& .wallpapersStyleButton:hover {
				background-color: ${color} !important;
				color: white;
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.changeWallpaperSection {
				.wallpaperConfirmButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};
				}

				.wallpaperInput {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};
				}

				.wallpapersSelection {
					& button {
						border: 2px solid ${darkMode ? "white" : "black"};
					}
				}

				.wallpapersStyleButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};

					&.chosenWallpaperStyle {
						background-color: ${color};
						color: white;
						border-color: ${color};
					}
				}
			}
		`,
		[darkMode]
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
		<section className='changeWallpaperSection' css={darkModeStyles}>
			<h2>{t("Settings.settingsWallpaperSet")}</h2>
			<div className='wallpaperSectionSettings'>
				<div className='wallpaperPanel' css={wallpaperConfirmButtonStyles}>
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
					<button className='wallpaperConfirmButton' css={wallpaperConfirmButtonStyles} onClick={handleCustomWallpaper}>
						<i className='fa-solid fa-arrow-right-to-bracket'></i>
					</button>
				</div>

				<div className='wallpapersSelection'>{wallpapers}</div>
				<div className='wallpapersStyle'>
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
			</div>
		</section>
	);
};

export default SettingsWallpaperSection;
