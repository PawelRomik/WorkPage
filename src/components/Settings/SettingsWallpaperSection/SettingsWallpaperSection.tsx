import wallpaperData from "../../../data/wallpapers";
import { useMemo } from "react";
import "./SettingsWallpaperSection.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { css } from "@emotion/react";

type SettingsWallpaperSectionProps = {
	changeBackground: (e: React.MouseEvent) => void;
	backgroundInputValue: string;
	handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	handleCustomWallpaper: () => void;
	handleBackgroundInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SettingsWallpaperSection = ({
	changeBackground,
	backgroundInputValue,
	handleInputKeyDown,
	handleCustomWallpaper,
	handleBackgroundInputChange,
}: SettingsWallpaperSectionProps) => {
	const { color } = useSettingsContext();

	const wallpaperConfirmButtonStyles = useMemo(
		() => css`
			&:focus,
			&:hover {
				color: ${color};
			}
		`,
		[color]
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
		<section className='changeWallpaperSection'>
			<h2>SET YOUR WALLPAPER</h2>

			<div className='wallpaperPanel'>
				<input
					className='wallpaperInput'
					type='text'
					name='wallpaperInput'
					value={backgroundInputValue}
					onChange={handleBackgroundInputChange}
					id='wallpaperInput'
					placeholder={`Custom wallpaper: (url)`}
					onKeyDown={handleInputKeyDown}
				></input>
				<button className='wallpaperConfirmButton' css={wallpaperConfirmButtonStyles} onClick={handleCustomWallpaper}>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</div>

			<div className='wallpapersSelection'>{wallpapers}</div>
		</section>
	);
};

export default SettingsWallpaperSection;
