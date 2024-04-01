import React, { useRef, useState, useEffect, useCallback } from "react";
import PaintTools from "./PaintTools/PaintTools";
import PaintBoard from "./PaintBoard/PaintBoard";
import LocalStorageNames from "../../utils/localstorageNames";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSettingsContext } from "../../providers/SettingsContext";
import { useTranslation } from "react-i18next";
import { paintContainerStyles } from "./Paint.styles";

enum BrushShape {
	Square = "square",
	Circle = "circle",
}

const { localPaintBackground, localPaintCanvas, localPaintColors } = LocalStorageNames;

const Paint = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const [brushColor, setBrushColor] = useState<string>("#000000");
	const [thickness, setThickness] = useState<number>(2);
	const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
	const [isPainting, setIsPainting] = useState<boolean>(false);
	const [isEraserOn, setIsEraserOn] = useState<boolean>(false);
	const [brushShape, setBrushShape] = useState<BrushShape>(BrushShape.Square);
	const { darkMode } = useSettingsContext();
	const [paintColors, changePaintColors] = useState<string[]>([]);
	const { t } = useTranslation();

	useEffect(() => {
		const storedColors = localStorage.getItem(localPaintColors);
		if (storedColors) {
			const parsedColors = JSON.parse(storedColors);
			changePaintColors(parsedColors);
			setBrushColor(parsedColors[0]);
		}
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d", { willReadFrequently: true });
			ctxRef.current = context;
		}
	}, []);

	useEffect(() => {
		const savedCanvasData = localStorage.getItem(localPaintCanvas);
		if (savedCanvasData) {
			const img = new Image();
			img.src = JSON.parse(savedCanvasData);
			img.onload = () => {
				if (ctxRef.current) {
					ctxRef.current.drawImage(img, 0, 0);
				}
			};
		}
		const savedBgc = localStorage.getItem(localPaintBackground);
		if (savedBgc) {
			setBackgroundColor(JSON.parse(savedBgc));
		} else {
			setBackgroundColor(darkMode ? "#ffffff" : "#363636");
		}
	}, [darkMode]);

	const saveToLocalStorage = useCallback(() => {
		localStorage.setItem(localPaintCanvas, JSON.stringify(canvasRef.current!.toDataURL("image/png")));
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

	const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBrushColor(e.target.value);
	}, []);

	const formatColor = useCallback(
		(rgb: string | null) =>
			rgb
				? `#${rgb
						.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
						?.slice(1)
						.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
						.join("")}`
				: "",
		[]
	);

	const handleOnButtonClickColorChange = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const target = e.target as HTMLButtonElement;
			setBrushColor(formatColor(target.style.backgroundColor));
		},
		[formatColor]
	);

	const addToSavedColors = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let array: string[] = [];

			if (!array.includes(e.target.value)) {
				array = [e.target.value, ...paintColors];
			} else {
				array = [...paintColors];
			}

			if (array.length >= 9) {
				array.pop();
			}
			localStorage.setItem(localPaintColors, JSON.stringify(array));
			changePaintColors([...array]);
		},
		[paintColors]
	);

	const handleThicknessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setThickness(Number(e.target.value));
	}, []);

	const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBackgroundColor(e.target.value);
		localStorage.setItem(localPaintBackground, JSON.stringify(e.target.value));
	}, []);

	const toggleEraser = useCallback(() => {
		setIsEraserOn(!isEraserOn);
	}, [isEraserOn]);

	const clearCanvas = useCallback(() => {
		withReactContent(Swal)
			.fire({
				title: t("Swal.swalTitle"),
				text: t("Swal.swalDesc"),
				showCancelButton: true,
				confirmButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
				cancelButtonColor: darkMode ? "lightgray" : "rgb(27, 27, 27)",
				confirmButtonText: t("Swal.swalYes"),
				cancelButtonText: t("Swal.swalNo"),
				background: darkMode ? "white" : "black",
				color: darkMode ? "black" : "white",
				showCloseButton: true,
				target: ".paintContainer",
			})
			.then((result) => {
				if (result.isConfirmed) {
					const canvas = canvasRef.current;
					const ctx = ctxRef.current;
					if (canvas && ctx) {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					}
					const newBgc = darkMode ? "#ffffff" : "#363636";
					setBackgroundColor(newBgc);
					localStorage.setItem(localPaintBackground, JSON.stringify(newBgc));
				}
			});

		saveToLocalStorage();
	}, [saveToLocalStorage, darkMode, t]);

	const toggleBrushShape = useCallback(() => {
		setBrushShape((prevShape) => (prevShape === BrushShape.Square ? BrushShape.Circle : BrushShape.Square));
	}, []);

	const startPaint = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		e.stopPropagation();
		const ctx = ctxRef.current;
		if (!ctx) return;

		ctx.beginPath();

		if ("touches" in e) {
			const rect = canvasRef.current!.getBoundingClientRect();
			ctx.moveTo(e.touches[0].pageX - rect.left, e.touches[0].pageY - rect.top);
		} else {
			ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		}

		setIsPainting(true);
	}, []);

	const paint = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
			e.stopPropagation();
			if (!isPainting) return;

			const ctx = ctxRef.current;
			if (!ctx) return;

			if ("touches" in e) {
				const rect = canvasRef.current!.getBoundingClientRect();
				ctx.lineTo(e.touches[0].pageX - rect.left, e.touches[0].pageY - rect.top);
			} else {
				ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
			}

			if (isEraserOn) {
				ctx.globalCompositeOperation = "destination-out";
			} else {
				ctx.globalCompositeOperation = "source-over";
				ctx.lineWidth = thickness;
				ctx.strokeStyle = brushColor;
				ctx.lineCap = brushShape === BrushShape.Circle ? "round" : "square";
			}

			ctx.stroke();
		},
		[brushShape, brushColor, isEraserOn, isPainting, thickness]
	);

	const endPaint = useCallback(() => {
		const ctx = ctxRef.current;
		if (ctx) {
			ctx.closePath();
			setIsPainting(false);
		}
		saveToLocalStorage();
	}, [saveToLocalStorage]);

	const saveImage = useCallback(
		(imageName: string) => {
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
						a.download = imageName;
						a.click();
					}
				}, "image/png");
			}
		},
		[backgroundColor]
	);

	const disableEraserOnRightClick = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			e.preventDefault();
			if (isEraserOn) {
				setIsEraserOn(false);
			}
		},
		[isEraserOn]
	);

	return (
		<div className='paintContainer' css={paintContainerStyles}>
			<PaintTools
				brushColor={brushColor}
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
				paintColors={paintColors}
				addToSavedColors={addToSavedColors}
				handleOnButtonClickColorChange={handleOnButtonClickColorChange}
			/>
			<PaintBoard
				canvasRef={canvasRef}
				backgroundColor={backgroundColor}
				startPaint={startPaint}
				paint={paint}
				endPaint={endPaint}
				disableEraserOnRightClick={disableEraserOnRightClick}
			/>
		</div>
	);
};

export default Paint;
