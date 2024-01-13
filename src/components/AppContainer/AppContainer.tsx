import "./AppContainer.style.scss";
import Settings from "../Settings/Settings";
import Notes from "../Notes/Notes";
import ToDoList from "../ToDoList/ToDoList";

interface AppContainerProps {
	app: {
		id: number;
		name: string;
		class: string;
	};
	closeApp: () => void;
}

const AppContainer: React.FC<AppContainerProps> = ({ app, closeApp }) => {
	const renderAppContent = () => {
		switch (app.name) {
			case "Settings":
				return <Settings />;
			case "ToDoList":
				return <ToDoList />;
			case "Notes":
				return <Notes />;
			default:
				return null;
		}
	};

	return (
		<div className='appContainer'>
			<header className='appContainerHeader'>
				<h3 className='appContainerTitle'>{app.name}</h3>
				<button className='closeButton' onClick={closeApp}>
					X
				</button>
			</header>
			<main className='appContainerContent'>{renderAppContent()}</main>
		</div>
	);
};

export default AppContainer;
