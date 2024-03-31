import { css } from "@emotion/react";

export const soundbarStyles = (darkMode: boolean) => css`
	&.soundbar {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		background-color: ${darkMode ? "white" : "black"};
		color: ${darkMode ? "black" : "white"};

		width: 12rem;
		height: 5rem;
		display: flex;
		justify-content: space-around;
		align-items: center;

		flex-direction: column;

		& > button {
			background-color: ${darkMode ? "lightgray" : "rgb(29, 29, 29)"};
			color: ${darkMode ? "black" : "white"};
		}

		& > div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
		}

		& i {
			cursor: pointer;
		}
	}
`;

export const soundbarSliderStyles = (color: string) => css`
	&.soundbarSlider {
		--thumb-height: 1.125em;
		--track-height: 0.125em;
		--track-color: rgba(189, 185, 185, 0.2);
		--brightness-hover: 180%;
		--brightness-down: 80%;
		--clip-edges: 0.125em;
	}

	&.soundbarSlider {
		color: ${color};
		position: relative;
		background: transparent;
		overflow: hidden;
	}

	&.soundbarSlider:active {
		cursor: grabbing;
	}

	&.soundbarSlider:disabled {
		filter: grayscale(1);
		opacity: 0.3;
		cursor: not-allowed;
	}

	&.soundbarSlider,
	&.soundbarSlider::-webkit-slider-runnable-track,
	&.soundbarSlider::-webkit-slider-thumb {
		-webkit-appearance: none;
		transition: all ease 100ms;
		height: var(--thumb-height);
	}

	&.soundbarSlider::-webkit-slider-runnable-track,
	&.soundbarSlider::-webkit-slider-thumb {
		position: relative;
	}

	&.soundbarSlider::-webkit-slider-thumb {
		--thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
		--clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
		--clip-bottom: calc(var(--thumb-height) - var(--clip-top));
		--clip-further: calc(100% + 1px);
		--box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

		width: var(--thumb-width, var(--thumb-height));
		background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--track-height) + 1px);
		background-color: currentColor;
		box-shadow: var(--box-fill);
		border-radius: var(--thumb-width, var(--thumb-height));

		filter: brightness(100%);
		clip-path: polygon(
			100% -1px,
			var(--clip-edges) -1px,
			0 var(--clip-top),
			-100vmax var(--clip-top),
			-100vmax var(--clip-bottom),
			0 var(--clip-bottom),
			var(--clip-edges) 100%,
			var(--clip-further) var(--clip-further)
		);
	}

	&.soundbarSlider:hover::-webkit-slider-thumb {
		filter: brightness(var(--brightness-hover));
		cursor: grab;
	}

	&.soundbarSlider:active::-webkit-slider-thumb {
		filter: brightness(var(--brightness-down));
		cursor: grabbing;
	}

	&.soundbarSlider::-webkit-slider-runnable-track {
		background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
	}

	&.soundbarSlider:disabled::-webkit-slider-thumb {
		cursor: not-allowed;
	}

	&.soundbarSlider,
	&.soundbarSlider::-moz-range-track,
	&.soundbarSlider::-moz-range-thumb {
		appearance: none;
		transition: all ease 100ms;
		height: var(--thumb-height);
	}

	&.soundbarSlider::-moz-range-track,
	&.soundbarSlider::-moz-range-thumb,
	&.soundbarSlider::-moz-range-progress {
		background: #fff0;
	}

	&.soundbarSlider::-moz-range-thumb {
		background: currentColor;
		border: 0;
		width: var(--thumb-width, var(--thumb-height));
		border-radius: var(--thumb-width, var(--thumb-height));
		cursor: grab;
	}

	&.soundbarSlider:active::-moz-range-thumb {
		cursor: grabbing;
	}

	&.soundbarSlider::-moz-range-track {
		width: 100%;
		background: var(--track-color);
	}

	&.soundbarSlider::-moz-range-progress {
		appearance: none;
		background: currentColor;
		transition-delay: 30ms;
	}

	&.soundbarSlider::-moz-range-track,
	&.soundbarSlider::-moz-range-progress {
		height: calc(var(--track-height) + 1px);
		border-radius: var(--track-height);
	}

	&.soundbarSlider::-moz-range-thumb,
	&.soundbarSlider::-moz-range-progress {
		filter: brightness(100%);
	}

	&.soundbarSlider:hover::-moz-range-thumb,
	&.soundbarSlider:hover::-moz-range-progress {
		filter: brightness(var(--brightness-hover));
	}

	&.soundbarSlider:active::-moz-range-thumb,
	&.soundbarSlider:active::-moz-range-progress {
		filter: brightness(var(--brightness-down));
	}

	&.soundbarSlider:disabled::-moz-range-thumb {
		cursor: not-allowed;
	}
`;
