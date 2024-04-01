import { css } from "@emotion/react";

export const settingsColorsSectionStyles = (darkMode: boolean) => css`
	&.changeColorsSection {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex: 1;
		width: 100%;
		min-height: 50%;
		gap: 10%;
		border-bottom: 0.25rem ${darkMode ? "rgb(221, 222, 223)" : "black"} dashed;

		& .colorsPanel {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			width: 100%;
			height: 60%;

			& .colorsGroup {
				display: flex;
				justify-content: space-between;
				gap: 1rem;
				width: 60%;
				font-weight: bold;

				& p {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				& .colorsButtonsContainer {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					width: 100%;
					flex-wrap: wrap;
					padding-left: 1rem;
					gap: 0.2rem;

					& .colorButton {
						height: 1.5rem;
						flex: 20%;
						cursor: pointer;

						border: 2px solid ${darkMode ? "white" : "black"};

						&:nth-of-type(1) {
							background-color: red;
						}
						&:nth-of-type(2) {
							background-color: orange;
						}
						&:nth-of-type(3) {
							background-color: lime;
						}
						&:nth-of-type(4) {
							background-color: darkgreen;
						}
						&:nth-of-type(5) {
							background-color: aqua;
						}
						&:nth-of-type(6) {
							background-color: blue;
						}
						&:nth-of-type(7) {
							background-color: purple;
						}
						&:nth-of-type(8) {
							background-color: magenta;
						}
					}
				}
			}
		}
	}

	@media (min-width: 768px) {
		&.changeColorsSection {
			& .colorsPanel {
				& .colorsGroup {
					width: 30%;

					& .colorsButtonsContainer {
						padding-left: 2rem;

						& .colorButton {
							flex: 20%;
							height: 2rem;
						}
					}
				}

				& h2 {
					font-size: 2.25rem;
				}
			}
		}
	}

	@media (min-width: 1920px) {
		&.changeColorsSection {
			& .colorsPanel {
				& .colorsGroup {
					width: 20%;
				}
			}
		}
	}
`;
