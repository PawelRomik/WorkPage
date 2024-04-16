import { useSettingsContext } from "../../../providers/SettingsContext";
import { useMemo } from "react";
import { paintSavedColorsStyles } from "./PaintSavedColors.styles";

type PaintToolsProps = {
	paintColors: string[];
	handleOnButtonClickColorChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PaintSavedColors = ({ paintColors, handleOnButtonClickColorChange }: PaintToolsProps) => {
	const { darkMode } = useSettingsContext();

	const mappedColors = useMemo(() => {
		const arr = [...paintColors];
		while (arr.length < 8) {
			arr.push("");
		}
		return arr.map((el, index) => (
			<button key={index} className='paintSavedColor' onClick={el ? handleOnButtonClickColorChange : undefined} style={{ backgroundColor: el || "transparent" }}></button>
		));
	}, [paintColors, handleOnButtonClickColorChange]);

	return (
		<div className='paintSavedColors' css={paintSavedColorsStyles(darkMode)}>
			{mappedColors}
		</div>
	);
};
