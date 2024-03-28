import "./AppContainer.style.scss";
import Settings from "../Settings/Settings";
import Notes from "../Notes/Notes";
import ToDoList from "../ToDoList/ToDoList";
import Calculator from "../Calculator/Calculator";
import Saper from "../Saper/Saper";
import Translator from "../Translator/Translator";
import Paint from "../Paint/Paint";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

type AppContainerProps = {
	app: {
		id: number;
		name: string;
		class: string;
	};
	closeApp: () => void;
	isOff: boolean;
	changeIsOff: (newValue: boolean) => void;
};

const AppContainer = ({ app, closeApp, isOff, changeIsOff }: AppContainerProps) => {
	const { t } = useTranslation();
	const { color, darkMode } = useSettingsContext();
	const [clickTimeout, changeClickTimeout] = useState<null | number>(null);
	const buttonStyles = useMemo(
		() => css`
			&:hover,
			&:focus {
				background-color: ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.appContainer {
				background-color: ${darkMode ? "rgb(212, 212, 212)" : "rgb(39, 39, 39);"};
				border: ${darkMode ? "6px solid white" : "6px solid black"};

				.appContainerHeader {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};

					.closeButton {
						color: ${darkMode ? "black" : "white"};

						&:hover,
						&:focus {
							color: white;
						}
					}
				}
			}
		`,
		[darkMode]
	);

	const renderAppContent = useCallback(() => {
		const { name } = app;
		switch (name) {
			case "Settings":
				return <Settings />;
			case "Calculator":
				return <Calculator />;
			case "Translator":
				return <Translator />;
			case "ToDoList":
				return <ToDoList />;
			case "Notes":
				return <Notes />;
			case "Paint":
				return <Paint />;
			case "Minesweeper":
				return <Saper />;
			default:
				return null;
		}
	}, [app]);

	const playAnimation = useCallback(() => {
		changeIsOff(true);
	}, [changeIsOff]);

	const blockClosingOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	}, []);

	const appContainerSize = useMemo(() => {
		return app.name === "Calculator" || app.name === "Settings" ? " smallContainer" : "";
	}, [app]);

	const handleMouseDown = useCallback(() => {
		changeClickTimeout(1);
		setTimeout(() => {
			changeClickTimeout(null);
		}, 300);
	}, []);

	const handleMouseUp = useCallback(() => {
		if (clickTimeout === 1) {
			clearTimeout(clickTimeout);
			changeClickTimeout(null);
			playAnimation();
		}
	}, [clickTimeout, playAnimation]);

	const appContainerClassName = useMemo(() => `appContainerBackground${isOff ? " offAnimation" : ""}`, [isOff]);

	return (
		<div className={appContainerClassName} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onAnimationEnd={closeApp}>
			<div className={`appContainer${appContainerSize}`} css={darkModeStyles} onClick={blockClosingOnClick} onMouseDown={blockClosingOnClick} onMouseUp={blockClosingOnClick}>
				<header className='appContainerHeader'>
					<h3 className='appContainerTitle'>{t(`Apps.${app.name}`)}</h3>
					<button className='closeButton' onClick={playAnimation} onAnimationEnd={closeApp} css={buttonStyles}>
						X
					</button>
				</header>
				<main className='appContainerContent'>{renderAppContent()}</main>
			</div>
		</div>
	);
};

export default AppContainer;
