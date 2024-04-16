import { useSettingsContext } from "../../../providers/SettingsContext";
import { useCallback } from "react";
import { PaintSavedColors } from "../PaintSavedColors/PaintSavedColors";
import { useTranslation } from "react-i18next";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { launchToast } from "../../../utils/toastFunction";
import { paintToolsStyles } from "./PaintTools.styles";

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
	saveImage: (imageName: string) => void;
	paintColors: string[];
	addToSavedColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleOnButtonClickColorChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PaintTools = ({
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
	saveImage,
	paintColors,
	addToSavedColors,
	handleOnButtonClickColorChange,
}: PaintToolsProps) => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const showSaveDialog = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			withReactContent(Swal)
				.fire({
					title: t("Paint.swalSaveImage"),
					inputLabel: t("Paint.swalChangeName"),
					inputValue: t("Paint.swalDefaultInput"),
					showCancelButton: true,
					confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
					confirmButtonText: t("Swal.swalYes"),
					cancelButtonText: t("Swal.swalNo"),
					input: "text",
					background: darkMode ? "white" : "black",
					color: darkMode ? "black" : "white",
					showCloseButton: true,
					target: ".paintContainer",
				})
				.then((result) => {
					if (result.isConfirmed) {
						saveImage(result.value);
						launchToast("success", t("Paint.toastSavedImage"));
					}
				});
		},
		[darkMode, saveImage, t]
	);

	return (
		<section className='paintTools' css={paintToolsStyles(darkMode, color)}>
			<div className='paintToolsWrapper'>
				<div className='paintToolsGroup'>
					<div className='paintInputContainer'>
						<p>{t("Paint.paintColor")} </p>
						<input className='paintInputColor' onBlur={addToSavedColors} type='color' value={brushColor} onChange={handleColorChange} />
					</div>
					<div className='paintInputContainer'>
						<p className='paintSizeParagraph'>
							{t("Paint.paintSize")} {thickness}
						</p>
						<input className='paintInputThickness' min={1} max={20} type='range' value={thickness} onChange={handleThicknessChange} />
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
						<p>{t("Paint.paintBackground")} </p>
						<input className='paintInputColor' type='color' value={backgroundColor} onChange={handleBackgroundColorChange} />
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
