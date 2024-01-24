import "./LoadingAnimation.style.scss";

const LoadingAnimation = () => {
	return (
		<div className='lds-roller'>
			{[...Array(8)].map((_, index) => {
				return <div key={index}></div>;
			})}
		</div>
	);
};

export default LoadingAnimation;
