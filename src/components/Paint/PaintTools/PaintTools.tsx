import "./PaintTools.style.scss";

enum BrushShape {
	Square = "square",
	Circle = "circle",
}

type PaintToolsProps = {
	color: string;
	handleColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	thickness: number;
	handleThicknessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	brushShape: "square" | "circle";
	toggleBrushShape: () => void;
	isEraserOn: boolean;
	toggleEraser: () => void;
	backgroundColor: string;
	handleBackgroundColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	clearCanvas: () => void;
	saveImage: () => void;
};

const PaintTools = ({
	color,
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
}: PaintToolsProps) => {
	return (
		<section className='paintTools'>
			<div className='paintToolsWrapper'>
				<div className='paintToolsGroup'>
					<div className='paintInputContainer'>
						<p>Color: </p>
						<input className='paintInputColor' type='color' value={color} onChange={handleColorChange} />
					</div>
					<div className='paintInputContainer'>
						<p className='paintSizeParagraph'>Size: {thickness}</p>
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
						<p>Background Color: </p>
						<input className='paintInputColor' type='color' value={backgroundColor} onChange={handleBackgroundColorChange} />
					</div>
					<div className='paintButtons'>
						<button className='paintButton' onClick={clearCanvas}>
							<i className='fa-solid fa-trash'></i>
						</button>
						<button className='paintButton' onClick={saveImage}>
							<i className='fa-solid fa-download'></i>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PaintTools;
