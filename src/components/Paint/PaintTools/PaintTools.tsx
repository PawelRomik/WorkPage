import "./PaintTools.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { css } from "@emotion/react";
import PaintSavedColors from "../PaintSavedColors/PaintSavedColors";

enum BrushShape {
	Square = "square",
	Circle = "circle",
}

type PaintToolsProps = {
	brushColor: string;
	handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	thickness: number;
	handleThicknessChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	brushShape: "square" | "circle";
	toggleBrushShape: () => void;
	isEraserOn: boolean;
	toggleEraser: () => void;
	backgroundColor: string;
	handleBackgroundColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clearCanvas: () => void;
	showSaveDialog: (e: React.MouseEvent) => void;
	paintColors: string[];
	addToSavedColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleOnButtonClickColorChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

const PaintTools = ({
	brushColor,
	handleColorChange,
	thickness,
	handleThicknessChange,
	brushShape,
	toggleBrushShape,
	isEraserOn,
	toggleEraser,
	backgroundColor,
	handleBackgroundColorChange,
	clearCanvas,
	showSaveDialog,
	paintColors,
	addToSavedColors,
	handleOnButtonClickColorChange,
}: PaintToolsProps) => {
	const { color, darkMode } = useSettingsContext();
	console.log(paintColors);

	const paintInputColorStyles = useMemo(
		() => css`
			&:focus-within::-webkit-color-swatch {
				border: 2px solid ${color};
			}

			&:focus-within::-moz-color-swatch {
				border: 2px solid ${color};
			}
		`,
		[color]
	);

	const paintInputThicknessStyles = useMemo(
		() => css`
			&:focus::-webkit-slider-thumb {
				border: 2px solid ${color};
			}

			&:focus {
				border: 2px solid ${color};
				color: ${color};
			}
		`,
		[color]
	);

	const paintButtonStyles = useMemo(
		() => css`
			& .paintButton:hover,
			& .paintButton:focus {
				border: 2px solid ${color};
				color: ${color};
			}
		`,
		[color]
	);

	const darkModeStyles = useMemo(
		() => css`
			&.paintTools {
				background-color: ${darkMode ? "lightgray" : "rgb(27,27,27)"};
				color: ${darkMode ? "black" : "white"};

				.paintInputColor {
					&::-webkit-color-swatch {
						border: 2px solid ${darkMode ? "black" : "white"};
					}

					&::-moz-color-swatch {
						border: 2px solid ${darkMode ? "black" : "white"};
					}
				}

				.paintInputThickness {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "black" : "white"};

					&::-webkit-slider-thumb {
						border: 2px solid ${darkMode ? "black" : "white"};
					}
				}

				.paintButton {
					background-color: ${darkMode ? "white" : "black"};
					color: ${darkMode ? "black" : "white"};
					border: 2px solid ${darkMode ? "black" : "white"};

					&.paintEraserActive {
						color: ${darkMode ? "white" : "black"};
						background-color: ${darkMode ? "black" : "white"};
					}
				}
			}
		`,
		[darkMode]
	);

	return (
		<section className='paintTools' css={darkModeStyles}>
			<div className='paintToolsWrapper' css={paintButtonStyles}>
				<div className='paintToolsGroup'>
					<div className='paintInputContainer'>
						<p>Color: </p>
						<input className='paintInputColor' onBlur={addToSavedColors} css={paintInputColorStyles} type='color' value={brushColor} onChange={handleColorChange} />
					</div>
					<div className='paintInputContainer'>
						<p className='paintSizeParagraph'>Size: {thickness}</p>
						<input className='paintInputThickness' min={1} max={20} css={paintInputThicknessStyles} type='range' value={thickness} onChange={handleThicknessChange} />
					</div>
					<button className='paintButton' onClick={toggleBrushShape}>
						{brushShape === BrushShape.Square ? <i className='fa-regular fa-square'></i> : <i className='fa-regular fa-circle'></i>}
					</button>
					<button className={`paintButton${isEraserOn ? " paintEraserActive" : ""}`} onClick={toggleEraser}>
						<i className='fa-solid fa-eraser'></i>
					</button>
				</div>
				<div className='paintToolsGroup'>
					<div className='paintInputContainer'>
						<p>Background Color: </p>
						<input className='paintInputColor' css={paintInputColorStyles} type='color' value={backgroundColor} onChange={handleBackgroundColorChange} />
					</div>
					<div className='paintButtons'>
						<button className='paintButton' onClick={clearCanvas}>
							<i className='fa-solid fa-trash'></i>
						</button>
						<button className='paintButton' onClick={showSaveDialog}>
							<i className='fa-solid fa-download'></i>
						</button>
					</div>
				</div>
				<PaintSavedColors paintColors={paintColors} handleOnButtonClickColorChange={handleOnButtonClickColorChange} />
			</div>
		</section>
	);
};

export default PaintTools;
