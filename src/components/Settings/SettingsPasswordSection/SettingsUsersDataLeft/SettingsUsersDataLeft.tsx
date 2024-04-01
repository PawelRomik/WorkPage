import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { launchToast } from "../../../../utils/toastFunction";
import withReactContent from "sweetalert2-react-content";
import { useSettingsContext } from "../../../../providers/SettingsContext";
import { SettingsUsersDataLeftStyles } from "./SettingsUsersDataLeft.styles";

type SettingsUsersDataLeftProps = {
	userName: string;
	changeUserName: (newUsername: string) => void;
};

const SettingsUsersDataLeft = ({ userName, changeUserName }: SettingsUsersDataLeftProps) => {
	const { t } = useTranslation();
	const { user } = useClerk();
	const { darkMode, color } = useSettingsContext();

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
									launchToast("error", t("Settings.toastNewPasswordTooShort"));
									throw new Error(t("Settings.toastNewPasswordTooShort"));
								}
								if (newPasswordInput?.value != confirmNewPasswordInput?.value) {
									launchToast("error", t("Settings.toastNewPasswordNoMatch"));
									throw new Error(t("Settings.toastNewPasswordNoMatch"));
								}
								await user?.updatePassword({ currentPassword: oldPasswordInput!.value, newPassword: newPasswordInput!.value }).catch(() => {
									launchToast("error", t("Settings.toastOldPasswordNoMatch"));
									Swal.showValidationMessage(``);
								});
							} catch (error) {
								Swal.showValidationMessage(``);
							}
						},
					})
					.then((result) => {
						if (result.isConfirmed) {
							launchToast("success", t("Settings.toastPasswordChanged"));
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
									launchToast("error", t("Settings.toastUsernameTooShort"));
									throw new Error(t("Settings.toastUsernameTooShort"));
								}
								await user?.update({ username: usernameInput?.value }).catch(() => {
									launchToast("error", t("Settings.toastWrongName"));

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
							launchToast("success", t("Settings.toastUsernameChanged"));
						}
					});
			}
		},
		[darkMode, t, user, changeUserName]
	);
	return (
		<div className='usersDataLeft' css={SettingsUsersDataLeftStyles(darkMode, color)}>
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
	);
};

export default SettingsUsersDataLeft;
