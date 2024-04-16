import { useCallback } from "react";
import { launchToast } from "../../../../utils/toastFunction";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { SettingsUsersDataRightStyles } from "./SettingsUsersDataRight.styles";

type SettingsUsersDataRightProps = {
	avatar: string;
	setAvatar: (newValue: string) => void;
};

export const SettingsUsersDataRight = ({ avatar, setAvatar }: SettingsUsersDataRightProps) => {
	const { t } = useTranslation();
	const { user } = useClerk();

	const changeAvatarOnChange = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files && e.target.files[0];
			await user
				?.setProfileImage({ file: file })
				.then(() => {
					launchToast("success", t("Settings.toastAvatarChanged"));
				})
				.catch(() => {
					launchToast("error", t("Settings.toastGenericError"));
				});
			await user?.reload();
			setAvatar(user!.imageUrl);
		},
		[user, t, setAvatar]
	);

	return (
		<div className='usersDataRight' css={SettingsUsersDataRightStyles}>
			<div className='avatarBox' title={t("Settings.settingsUserSectionAvatarHover")}>
				<input type='file' className='avatarFileInput' onChange={changeAvatarOnChange}></input>
				<img src={avatar} alt='avatar'></img>
			</div>
		</div>
	);
};
