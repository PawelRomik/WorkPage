import { useEffect, useState } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { settingsPasswordSectionStyles } from "./SettingsPasswordSection.styles";
import SettingsUsersDataLeft from "./SettingsUsersDataLeft/SettingsUsersDataLeft";
import SettingsUsersDataRight from "./SettingsUsersDataRight/SettingsUsersDataRight";

const SettingsPasswordSection = () => {
	const { darkMode } = useSettingsContext();
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

	return (
		<section className='changePasswordSection' css={settingsPasswordSectionStyles(darkMode)}>
			<h2>{t("Settings.settingsUserSection")}</h2>
			<div className='usersDataContainer'>
				<SettingsUsersDataLeft userName={userName} changeUserName={changeUserName} />
				<SettingsUsersDataRight avatar={avatar} changeAvatar={changeAvatar} />
			</div>
		</section>
	);
};

export default SettingsPasswordSection;
