import { useSettingsContext } from "../../providers/SettingsContext";
import { loadingAnimationStyles } from "./LoadingAnimation.styles";

type loadingAnimationProps = {
	animationEnd?: () => void;
	repeats?: number;
};

const LoadingAnimation = ({ animationEnd, repeats }: loadingAnimationProps) => {
	const { darkMode } = useSettingsContext();
	return (
		<div className='lds-roller' onAnimationEnd={animationEnd} css={loadingAnimationStyles(repeats, darkMode)}>
			{[...Array(8)].map((_, index) => {
				return <div key={index}></div>;
			})}
		</div>
	);
};

export default LoadingAnimation;
