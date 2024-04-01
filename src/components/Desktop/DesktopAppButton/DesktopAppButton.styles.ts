import { css } from "@emotion/react";

export const desktopAppButtonStyles = (color: string) => css`
	&.desktopAppButton {
		background-color: transparent;
		color: white;
		border: none;
		width: 4.5rem;
		height: 4.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 0.65rem;
		gap: 0.5rem;
		font-weight: bold;
		text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000, -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000, 1px 1px 0px #000,
			-2px -2px 0px #000, -1px -2px 0px #000, 0px -2px 0px #000, 1px -2px 0px #000, 2px -2px 0px #000, 2px -1px 0px #000, 2px 0px 0px #000, 2px 1px 0px #000, 2px 2px 0px #000,
			1px 2px 0px #000, 0px 2px 0px #000, -1px 2px 0px #000, -2px 2px 0px #000, -2px 1px 0px #000, -2px 0px 0px #000, -2px -1px 0px #000;
		outline: none;
		cursor: pointer;

		&:focus {
			background-color: ${color}33;
		}

		& .desktopAppIcon {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 768px) {
		&.desktopAppButton {
			width: 6rem;
			height: 6rem;
			font-size: 0.8rem;

			& .desktopAppIcon {
				font-size: 2.5rem;
			}
		}
	}
`;
