import "./PaintSavedColors.style.scss";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { css } from "@emotion/react";

type PaintToolsProps = {
	paintColors: string[];
	handleOnButtonClickColorChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};

const PaintSavedColors = ({ paintColors, handleOnButtonClickColorChange }: PaintToolsProps) => {
	const { darkMode } = useSettingsContext();

	const paintSavedColorButtonStyles = useMemo(
		() => css`
			& .paintSavedColor {
				border: 2px solid ${darkMode ? "white" : "black"};
			}
		`,
		[darkMode]
	);

	const mappedColors = useMemo(() => {
		const arr = [...paintColors];
		while (arr.length < 8) {
			arr.push("");
		}
		return arr.map((el, index) => (
			<button key={index} className='paintSavedColor' onClick={el ? () => handleOnButtonClickColorChange : undefined} style={{ backgroundColor: el || "transparent" }}></button>
		));
	}, [paintColors, handleOnButtonClickColorChange]);

	return (
		<div className='paintToolsGroup paintSavedColors' css={paintSavedColorButtonStyles}>
			{mappedColors}
		</div>
	);
};

export default PaintSavedColors;
