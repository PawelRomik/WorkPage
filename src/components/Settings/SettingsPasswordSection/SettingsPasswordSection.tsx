import { useEffect, useState } from "react";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { settingsPasswordSectionStyles } from "./SettingsPasswordSection.styles";
import { SettingsUsersDataLeft } from "./SettingsUsersDataLeft/SettingsUsersDataLeft";
import { SettingsUsersDataRight } from "./SettingsUsersDataRight/SettingsUsersDataRight";

export const SettingsPasswordSection = () => {
	const { darkMode } = useSettingsContext();
	const { t } = useTranslation();
	const { user } = useClerk();
	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		if (typeof user?.username === "string") {
			setUserName(user.username);
		}
		if (typeof user?.imageUrl === "string") {
			setAvatar(user.imageUrl);
		}
	}, [user, setAvatar, setUserName]);

	return (
		<section className='changePasswordSection' css={settingsPasswordSectionStyles(darkMode)}>
			<h2>{t("Settings.settingsUserSection")}</h2>
			<div className='usersDataContainer'>
				<SettingsUsersDataLeft userName={userName} setUserName={setUserName} />
				<SettingsUsersDataRight avatar={avatar} setAvatar={setAvatar} />
			</div>
		</section>
	);
};
