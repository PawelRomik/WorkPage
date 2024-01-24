import "./DesktopApps.style.scss";
import { useMemo } from "react";
import AppButton from "../DesktopAppButton/DesktopAppButton";
import type { App } from "../Desktop";

type DesktopAppsProps = {
	appData: App[];
	handleLaunchApp: (e: React.MouseEvent) => void;
};

const DesktopApps = ({ handleLaunchApp, appData }: DesktopAppsProps) => {
	const apps = useMemo(() => {
		if (!appData) return;

		return appData.map((app) => <AppButton key={app.id} app={app} handleLaunchApp={handleLaunchApp} />);
	}, [appData, handleLaunchApp]);

	return (
		<div className='apps'>
			<section className='leftApps'>{apps}</section>
		</div>
	);
};

export default DesktopApps;
