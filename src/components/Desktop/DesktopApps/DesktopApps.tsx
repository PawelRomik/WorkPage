import "./DesktopApps.style.scss";
import { useMemo } from "react";
import AppButton from "../DesktopAppButton/DesktopAppButton";
import type { App } from "../Desktop";
import { toast } from "react-toastify";

type DesktopAppsProps = {
	appData: App[];
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const DesktopApps = ({ handleLaunchApp, appData }: DesktopAppsProps) => {
	const apps = useMemo(() => {
		const hasTranslatorEnv = import.meta.env.VITE_TRANSLATOR_API;

		return appData.map((app) => {
			if (app.name === "Translator" && !hasTranslatorEnv) {
				toast.warn("No Translator ApiKey found! Translator won't work without it!");
				return null;
			}
			return <AppButton key={app.id} app={app} handleLaunchApp={handleLaunchApp} />;
		});
	}, [appData, handleLaunchApp]);

	return (
		<div className='apps'>
			<section className='leftApps'>{apps}</section>
		</div>
	);
};

export default DesktopApps;
