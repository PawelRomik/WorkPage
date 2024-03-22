import "./PaintBoard.style.scss";

type PaintBoardProps = {
	canvasRef: React.RefObject<HTMLCanvasElement> | null;
	backgroundColor: string;
	startPaint: (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
	paint: (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
	endPaint: () => void;
	disableEraserOnRightClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
};

const PaintBoard = ({ canvasRef, backgroundColor, startPaint, paint, endPaint, disableEraserOnRightClick }: PaintBoardProps) => {
	return (
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
				onContextMenu={disableEraserOnRightClick}
				onMouseLeave={endPaint}
			></canvas>
		</section>
	);
};

export default PaintBoard;
