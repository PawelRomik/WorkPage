import "./AppContainer.style.scss";

interface AppContainerProps {
	app: {
		id: number;
		name: string;
		class: string;
	};
	closeApp: () => void;
}

const AppContainer: React.FC<AppContainerProps> = ({ app, closeApp }) => {
	return (
		<div className='appContainer'>
			<header className='appContainerHeader'>
				<h3 className='appContainerTitle'>{app.name}</h3>
				<button className='closeButton' onClick={closeApp}>
					X
				</button>
			</header>
			<main className='appContainerContent'></main>
		</div>
	);
};

export default AppContainer;
