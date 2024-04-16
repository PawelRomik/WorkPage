import { useMemo } from "react";
import { AppButton } from "../DesktopAppButton/DesktopAppButton";
import { useTranslation } from "react-i18next";
import { desktopAppsContainerStyles } from "./DesktopApps.styles";
import { launchToast } from "../../../utils/toastFunction";
import { appData } from "../../../data/appData";

type DesktopAppsProps = {
	handleLaunchApp: (e: React.MouseEvent) => void;
};

export const DesktopApps = ({ handleLaunchApp }: DesktopAppsProps) => {
	const { t } = useTranslation();

	const apps = useMemo(() => {
		const hasTranslatorEnv = import.meta.env.VITE_TRANSLATOR_API;
		return appData.slice(1).map((app) => {
			if (app.name === "Translator" && !hasTranslatorEnv) {
				launchToast("error", t("Translator.toastNoApiKey"));
				return null;
			}
			return <AppButton app={app} key={app.id} handleLaunchApp={handleLaunchApp} />;
		});
	}, [handleLaunchApp, t]);

	return (
		<div className='desktopAppsContainer' css={desktopAppsContainerStyles}>
			<section className='leftApps'>{apps}</section>
			<section className='rightApps'>
				<AppButton key={0} app={appData[0]} handleLaunchApp={handleLaunchApp} />
			</section>
		</div>
	);
};
