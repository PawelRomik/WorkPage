import "./DesktopApps.style.scss";
import { useMemo } from "react";
import AppButton from "../DesktopAppButton/DesktopAppButton";
import type { App } from "../Desktop";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type DesktopAppsProps = {
	appData: App[];
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const DesktopApps = ({ handleLaunchApp, appData }: DesktopAppsProps) => {
	const { t } = useTranslation();
	const apps = useMemo(() => {
		const hasTranslatorEnv = import.meta.env.VITE_TRANSLATOR_API;

		return appData.map((app) => {
			if (app.name === "Translator" && !hasTranslatorEnv) {
				toast.warn(t("Translator.toastNoApiKey"));
				return null;
			}
			return <AppButton key={app.id} app={app} handleLaunchApp={handleLaunchApp} />;
		});
	}, [appData, handleLaunchApp, t]);

	return (
		<div className='apps'>
			<section className='leftApps'>{apps}</section>
		</div>
	);
};

export default DesktopApps;
