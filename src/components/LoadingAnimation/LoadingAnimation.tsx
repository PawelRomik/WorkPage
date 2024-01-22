import "./LoadingAnimation.style.scss";

const LoadingAnimation = () => {
	return (
		<div className='lds-roller'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingAnimation;
