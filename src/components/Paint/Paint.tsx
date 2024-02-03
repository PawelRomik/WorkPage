import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Paint.style.scss";
import PaintTools from "./PaintTools/PaintTools";
import PaintBoard from "./PaintBoard/PaintBoard";

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

	const saveToLocalStorage = useCallback(() => {
		localStorage.setItem("paintCanvas", JSON.stringify(canvasRef.current!.toDataURL("image/png")));
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
	}, [saveToLocalStorage]);

	const handleColorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value);
	}, []);

	const handleThicknessChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setThickness(Number(event.target.value));
	}, []);

	const handleBackgroundColorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundColor(event.target.value);
		localStorage.setItem("paintBgc", JSON.stringify(event.target.value));
	}, []);

	const toggleEraser = useCallback(() => {
		setIsEraserOn(!isEraserOn);
	}, [isEraserOn]);

	const clearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		const ctx = ctxRef.current;
		if (canvas && ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		saveToLocalStorage();
	}, [saveToLocalStorage]);

	const toggleBrushShape = useCallback(() => {
		setBrushShape((prevShape) => (prevShape === BrushShape.Square ? BrushShape.Circle : BrushShape.Square));
	}, []);

	const startPaint = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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
	}, []);

	const paint = useCallback(
		(event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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
		},
		[brushShape, color, isEraserOn, isPainting, thickness]
	);

	const endPaint = useCallback(() => {
		const ctx = ctxRef.current;
		if (ctx) {
			ctx.closePath();
			setIsPainting(false);
		}
		saveToLocalStorage();
	}, [saveToLocalStorage]);

	const saveImage = useCallback(() => {
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
	}, [backgroundColor]);

	return (
		<div className='paintContainer'>
			<PaintTools
				brushColor={color}
				handleColorChange={handleColorChange}
				thickness={thickness}
				handleThicknessChange={handleThicknessChange}
				brushShape={brushShape}
				toggleBrushShape={toggleBrushShape}
				isEraserOn={isEraserOn}
				toggleEraser={toggleEraser}
				backgroundColor={backgroundColor}
				handleBackgroundColorChange={handleBackgroundColorChange}
				clearCanvas={clearCanvas}
				saveImage={saveImage}
			/>
			<PaintBoard canvasRef={canvasRef} backgroundColor={backgroundColor} startPaint={startPaint} paint={paint} endPaint={endPaint} />
		</div>
	);
};

export default Paint;
