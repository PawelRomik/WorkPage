import "./LoadingAnimation.style.scss";
import { useMemo } from "react";
import { css } from "@emotion/react";

type loadingAnimationProps = {
	animationEnd?: () => void;
	repeats?: number;
};

const LoadingAnimation = ({ animationEnd, repeats }: loadingAnimationProps) => {
	const animationStyles = useMemo(
		() => css`
			& div {
				animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) ${repeats};
			}
		`,

		[repeats]
	);
	return (
		<div className='lds-roller' onAnimationEnd={animationEnd} css={animationStyles}>
			{[...Array(8)].map((_, index) => {
				return <div key={index}></div>;
			})}
		</div>
	);
};

export default LoadingAnimation;
