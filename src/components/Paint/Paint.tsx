import React, { useRef, useState, useEffect } from "react";
import "./Paint.style.scss";

enum BrushShape {
	Square = "square",
	Circle = "circle",
}

const Paint = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const [color, setColor] = useState<string>("#000000");
	const [thickness, setThickness] = useState<number>(2);
	const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
	const [isPainting, setIsPainting] = useState<boolean>(false);
	const [isEraserOn, setIsEraserOn] = useState<boolean>(false);
	const [brushShape, setBrushShape] = useState<BrushShape>(BrushShape.Square);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d", { willReadFrequently: true });
			ctxRef.current = context;
		}
	}, []);

	useEffect(() => {
		const savedCanvasData = localStorage.getItem("paintCanvas");
		if (savedCanvasData) {
			const img = new Image();
			img.src = JSON.parse(savedCanvasData);
			img.onload = () => {
				if (ctxRef.current) {
					ctxRef.current.drawImage(img, 0, 0);
				}
			};
		}
		const savedBgc = localStorage.getItem("paintBgc");
		if (savedBgc) setBackgroundColor(JSON.parse(savedBgc));
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const imageData = ctxRef.current?.getImageData(0, 0, canvas.width, canvas.height);
			canvas.width = 0;
			canvas.height = 0;

			const parent = canvas.parentElement;
			if (!parent) return;

			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;

			if (imageData) {
				ctxRef.current?.putImageData(imageData, 0, 0);
			}
			saveToLocalStorage();
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value);
	};

	const handleThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setThickness(Number(event.target.value));
	};

	const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundColor(event.target.value);
		localStorage.setItem("paintBgc", JSON.stringify(event.target.value));
	};

	const toggleEraser = () => {
		setIsEraserOn(!isEraserOn);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (canvas && ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		saveToLocalStorage();
	};

	const toggleBrushShape = () => {
		setBrushShape((prevShape) => (prevShape === BrushShape.Square ? BrushShape.Circle : BrushShape.Square));
	};

	const startPaint = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		event.stopPropagation();
		const ctx = ctxRef.current;
		if (!ctx) return;

		ctx.beginPath();

		if ("touches" in event) {
			const rect = canvasRef.current!.getBoundingClientRect();
			ctx.moveTo(event.touches[0].pageX - rect.left, event.touches[0].pageY - rect.top);
		} else {
			ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
		}

		setIsPainting(true);
	};

	const paint = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		event.stopPropagation();
		if (!isPainting) return;

		const ctx = ctxRef.current;
		if (!ctx) return;

		if ("touches" in event) {
			const rect = canvasRef.current!.getBoundingClientRect();
			ctx.lineTo(event.touches[0].pageX - rect.left, event.touches[0].pageY - rect.top);
		} else {
			ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
		}

		if (isEraserOn) {
			ctx.globalCompositeOperation = "destination-out";
		} else {
			ctx.globalCompositeOperation = "source-over";
			ctx.lineWidth = thickness;
			ctx.strokeStyle = color;
			ctx.lineCap = brushShape === BrushShape.Circle ? "round" : "square";
		}

		ctx.stroke();
	};

	const endPaint = () => {
		const ctx = ctxRef.current;
		if (ctx) {
			ctx.closePath();
			setIsPainting(false);
		}
		saveToLocalStorage();
	};

	const saveImage = () => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;

		if (canvas && ctx) {
			const tempCanvas = document.createElement("canvas");
			const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
			if (!tempCtx) return;

			tempCanvas.width = canvas.width;
			tempCanvas.height = canvas.height;

			tempCtx.fillStyle = backgroundColor;
			tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
			tempCtx.drawImage(canvas, 0, 0);

			tempCanvas.toBlob((blob) => {
				if (blob) {
					const a = document.createElement("a");
					a.href = URL.createObjectURL(blob);
					a.download = "image.png";
					a.click();
				}
			}, "image/png");
		}
	};

	const saveToLocalStorage = () => {
		localStorage.setItem("paintCanvas", JSON.stringify(canvasRef.current!.toDataURL("image/png")));
	};

	return (
		<div className='paintContainer'>
			<section className='paintTools'>
				<div className='paintToolsWrapper'>
					<div className='paintToolsGroup'>
						<div className='paintInputContainer'>
							<p>Color: </p>
							<input className='paintInputColor' type='color' value={color} onChange={handleColorChange} />
						</div>
						<div className='paintInputContainer'>
							<p>Thickness: </p>
							<input className='paintInputText' min={1} max={20} type='number' value={thickness} onChange={handleThicknessChange} />
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
			<section className='paintBoard'>
				<canvas
					ref={canvasRef}
					className='paintCanvas'
					style={{ backgroundColor: backgroundColor }}
					onMouseDown={startPaint}
					onMouseMove={paint}
					onMouseUp={endPaint}
					onTouchStart={startPaint}
					onTouchMove={paint}
					onTouchEnd={endPaint}
				></canvas>
			</section>
		</div>
	);
};

export default Paint;
