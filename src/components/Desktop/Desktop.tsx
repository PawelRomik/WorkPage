import "./Desktop.style.scss";
import data from "../../data/apps";

export default function Desktop() {
	const apps = data.map((app) => (
		<button className='app' key={app.id}>
			<i className={`${app.class} appIcon`}></i>
			<p>{app.name}</p>
		</button>
	));
	return (
		<main className='desktop'>
			<div className='appContainer'>
				<section className='leftApps'>{apps}</section>
				<section className='rightApps'>
					<button className='settings app'>
						<i className='fa-solid fa-cloud appIcon'></i>
						<p>Weather</p>
					</button>
					<button className='settings app'>
						<i className='fa-solid fa-gear appIcon'></i>
						<p>Settings</p>
					</button>
				</section>
			</div>
		</main>
	);
}
