import { loadingAnimationStyles } from "./LoadingAnimation.styles";

type loadingAnimationProps = {
	animationEnd?: () => void;
	repeats?: number;
};

export const LoadingAnimation = ({ animationEnd, repeats }: loadingAnimationProps) => {
	return (
		<div className='lds-roller' onAnimationEnd={animationEnd} css={loadingAnimationStyles(repeats)}>
			{[...Array(8)].map((_, index) => {
				return <div key={index}></div>;
			})}
		</div>
	);
};
