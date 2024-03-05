import { useMemo } from "react";
import "./SettingsPasswordSection.style.scss";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";

type SettingsPasswordSectionProps = {
	password: string;
	oldPassword: string;
	newPassword: string;
	unlock: (e: React.MouseEvent<HTMLButtonElement>) => void;
	changePass: () => void;
	unsetPass: () => void;
	handleOldPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SettingsPasswordSection = ({
	password,
	oldPassword,
	newPassword,
	unlock,
	changePass,
	unsetPass,
	handleNewPasswordChange,
	handleOldPasswordChange,
}: SettingsPasswordSectionProps) => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const passwordButtonsStyles = useMemo(
		() => css`
			& .changePasswordButtons > button:focus,
			& .changePasswordButtons > button:hover {
				background-color: ${color} !important;
				color: white !important;
			}

			& .changePasswordInput {
				&:focus {
					border: 2px solid ${color} !important;
				}
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.changePasswordSection {
				border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;

				.changePasswordInput {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "white" : "black"};
				}

				.unlockButton,
				.removeButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
				}
			}
		`,
		[darkMode]
	);

	const sectionTitle = useMemo(() => (password ? t("Settings.settingsPasswordChange") : t("Settings.settingsPasswordSet")), [password, t]);
	return (
		<section className='changePasswordSection' css={[passwordButtonsStyles, darkModeStyles]}>
			<h2>{sectionTitle}</h2>
			<div className='passContainer'>
				{password && (
					<input
						className='changePasswordInput'
						value={oldPassword}
						onChange={handleOldPasswordChange}
						type='password'
						id='oldpassword'
						name='oldpassword'
						placeholder={t("Settings.settingsPasswordInputOld")}
					/>
				)}
				<input
					className='changePasswordInput'
					value={newPassword}
					onChange={handleNewPasswordChange}
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					placeholder={t("Settings.settingsPasswordInputNew")}
				/>

				<div className='changePasswordButtons'>
					{password ? (
						<>
							<button className='unlockButton' onClick={changePass}>
								{t("Settings.settingsPasswordButtonChange")}
							</button>
							<button className='removeButton' onClick={unsetPass}>
								{t("Settings.settingsPasswordButtonRemove")}
							</button>
						</>
					) : (
						<button className='unlockButton' onClick={unlock}>
							{t("Settings.settingsPasswordButtonConfirm")}
						</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default SettingsPasswordSection;
