import "./Desktop.style.scss";
import { useEffect, useState } from "react";
import data from "../../data/apps";
import AppContainer from "../AppContainer/AppContainer";
import Weather from "../Weather/Weather";
import { useBackgroundContext } from "../../providers/BackgroundContext";

interface App {
	id: number;
	name: string;
	class: string;
}

export default function Desktop() {
	const { background } = useBackgroundContext();
	const [allApps, setAllApps] = useState<App[]>([]);
	const [chosenApp, changeChosenApp] = useState<App | null>(null);

	useEffect(() => {
		setAllApps(data);
	}, []);

	const launchApp = (e: React.MouseEvent) => {
		const target = e.currentTarget as HTMLButtonElement;
		const id: number = Number(target.dataset.app);
		changeChosenApp(allApps[id]);
	};

	const closeApp = () => {
		changeChosenApp(null);
	};

	const apps = allApps.map((app) => (
		<button className={`app ${app.name === "Settings" && "settings"}`} key={app.id} data-app={app.id} onClick={(e) => launchApp(e)}>
			<i className={`${app.class} appIcon`}></i>
			<p>{app.name}</p>
		</button>
	));

	return (
		<main className='desktop' style={{ backgroundImage: `url(${background})` }}>
			{chosenApp !== null && <AppContainer app={chosenApp} closeApp={closeApp} />}
			<div className='apps'>
				<section className='leftApps'>{apps}</section>
			</div>
			<Weather />
		</main>
	);
}
