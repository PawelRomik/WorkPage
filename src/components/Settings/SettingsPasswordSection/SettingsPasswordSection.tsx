import { useCallback, useEffect, useMemo, useState } from "react";
import "./SettingsPasswordSection.style.scss";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

const SettingsPasswordSection = () => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const { user } = useClerk();
	const [userName, changeUserName] = useState("");
	const [avatar, changeAvatar] = useState("");

	useEffect(() => {
		if (typeof user?.username === "string") {
			changeUserName(user.username);
		}
		if (typeof user?.imageUrl === "string") {
			changeAvatar(user.imageUrl);
		}
	}, [user, changeAvatar, changeUserName]);

	const darkModeStyles = useMemo(
		() => css`
			&.changePasswordSection {
				border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;
			}

			& .usersUsername {
				color: ${color};
				font-weight: bold;
			}

			& .usersDataBox button {
				background-color: ${darkMode ? "white" : "black"};
				color: ${darkMode ? "black" : "white"};
				border: 2px solid ${darkMode ? "black" : "white"};

				&:hover,
				&:active {
					background-color: ${color};
					color: white;
				}
			}
		`,
		[darkMode, color]
	);

	const showModal = useCallback(
		(type: string) => {
			if (type === "password") {
				withReactContent(Swal)
					.fire({
						title: t("Settings.settingsUserSectionChangePassword"),
						html: `
					<div><label for="swal-input1">${t("Settings.settingsUserSectionOldPassword")}</label><input type="password" id="swal-input1" class="swal2-input"></div>
					<div><label for="swal-input2">${t("Settings.settingsUserSectionNewPassword")}</label><input type="password" id="swal-input2" class="swal2-input"></div>
					<div><label for="swal-input3">${t("Settings.settingsUserSectionConfirmPassword")}</label><input type="password" id="swal-input3" class="swal2-input"></div>
				  `,
						showCancelButton: true,
						confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
						cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
						confirmButtonText: t("Swal.swalYes"),
						cancelButtonText: t("Swal.swalNo"),
						background: darkMode ? "white" : "black",
						color: darkMode ? "black" : "white",
						showCloseButton: true,
						target: ".changePasswordSection",
						preConfirm: async () => {
							const oldPasswordInput = document.getElementById("swal-input1") as HTMLInputElement | null;
							const newPasswordInput = document.getElementById("swal-input2") as HTMLInputElement | null;
							const confirmNewPasswordInput = document.getElementById("swal-input3") as HTMLInputElement | null;

							try {
								if ((newPasswordInput?.value?.length ?? 0) < 8 || (confirmNewPasswordInput?.value?.length ?? 0) < 8) {
									toast.error(t("Settings.toastNewPasswordTooShort"));
									throw new Error(t("Settings.toastNewPasswordTooShort"));
								}
								if (newPasswordInput?.value != confirmNewPasswordInput?.value) {
									toast.error(t("Settings.toastNewPasswordNoMatch"));
									throw new Error(t("Settings.toastNewPasswordNoMatch"));
								}
								await user?.updatePassword({ currentPassword: oldPasswordInput!.value, newPassword: newPasswordInput!.value }).catch(() => {
									toast.error(t("Settings.toastOldPasswordNoMatch"));
									Swal.showValidationMessage(``);
								});
							} catch (error) {
								Swal.showValidationMessage(``);
							}
						},
					})
					.then((result) => {
						if (result.isConfirmed) {
							toast.success(t("Settings.toastPasswordChanged"));
						}
					});
			} else if (type === "username") {
				withReactContent(Swal)
					.fire({
						title: t("Settings.settingsUserSectionChangeUsername"),
						html: `
					<div><label for="swal-input1"${t("Settings.settingsUserSectionUsername")}</label><input id="swal-input1" class="swal2-input"></div>
				  `,
						showCancelButton: true,
						confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
						cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
						confirmButtonText: t("Swal.swalYes"),
						cancelButtonText: t("Swal.swalNo"),
						background: darkMode ? "white" : "black",
						color: darkMode ? "black" : "white",
						showCloseButton: true,
						target: ".changePasswordSection",
						preConfirm: async () => {
							const usernameInput = document.getElementById("swal-input1") as HTMLInputElement | null;

							try {
								if ((usernameInput?.value?.length ?? 0) < 4) {
									toast.error(t("Settings.toastUsernameTooShort"));
									throw new Error(t("Settings.toastUsernameTooShort"));
								}
								await user?.update({ username: usernameInput?.value }).catch(() => {
									toast.error(t("Settings.toastWrongName"));
									Swal.showValidationMessage(``);
								});
								await user?.reload();
								const username = user?.username || "";

								changeUserName(username);
							} catch (error) {
								Swal.showValidationMessage(``);
							}
						},
					})
					.then(async (result) => {
						if (result.isConfirmed) {
							toast.success(t("Settings.toastUsernameChanged"));
						}
					});
			}
		},
		[darkMode, t, user]
	);

	const changeAvatarOnChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files && e.target.files[0];
			await user
				?.setProfileImage({ file: file })
				.then(() => {
					toast.success(t("Settings.toastAvatarChanged"));
				})
				.catch(() => {
					toast.error(t("Settings.toastGenericError"));
				});
			await user?.reload();
			changeAvatar(user!.imageUrl);
		},
		[user, t]
	);

	return (
		<section className='changePasswordSection' css={darkModeStyles}>
			<h2>{t("Settings.settingsUserSection")}</h2>
			<div className='usersDataContainer'>
				<div className='usersDataLeft'>
					<div className='usersDataBox'>
						<p>
							{t("Settings.settingsUserSectionUsername")}
							<span className='usersUsername'>{userName}</span>
						</p>
						<button onClick={() => showModal("username")}>{t("Settings.settingsUserSectionButtonText")}</button>
					</div>
					{user?.passwordEnabled && (
						<div className='usersDataBox'>
							<p>{t("Settings.settingsUserSectionPassword")} </p>
							<button onClick={() => showModal("password")}>{t("Settings.settingsUserSectionButtonText")}</button>
						</div>
					)}
				</div>
				<div className='usersDataRight'>
					<div className='avatarBox' title={t("Settings.settingsUserSectionAvatarHover")}>
						<input type='file' className='avatarFileInput' onChange={changeAvatarOnChange}></input>
						<img src={avatar} alt='avatar' onClick={() => showModal("avatar")}></img>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SettingsPasswordSection;
