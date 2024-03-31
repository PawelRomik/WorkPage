import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { appContainerHeaderStyles, closeButtonStyles } from "./AppContainerHeader.styles";

type AppContainerHeaderProps = {
	appName: string;
	playAnimation: () => void;
	closeApp: () => void;
};

const AppContainerHeader = ({ appName, playAnimation, closeApp }: AppContainerHeaderProps) => {
	const { darkMode, color } = useSettingsContext();
	const { t } = useTranslation();

	return (
		<header className='appContainerHeader' css={appContainerHeaderStyles(darkMode)}>
			<h3 className='appContainerTitle'>{t(`Apps.${appName}`)}</h3>
			<button className='closeButton' onClick={playAnimation} onAnimationEnd={closeApp} css={closeButtonStyles(darkMode, color)}>
				X
			</button>
		</header>
	);
};

export default AppContainerHeader;
