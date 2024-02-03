import { useMemo } from "react";
import "./CalculatorResult.style.scss";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";

type CalculatorResultProps = {
	firstNumber: string | undefined;
	operator: string | undefined;
	secondNumber: string | undefined;
	copyContent: () => void;
};

const CalculatorResult = ({ firstNumber, operator, secondNumber, copyContent }: CalculatorResultProps) => {
	const { color } = useSettingsContext();

	const paragraphStyles = useMemo(
		() => css`
			color: ${color};
		`,
		[color]
	);

	const topContent = useMemo(() => (operator ? (firstNumber !== undefined ? firstNumber : "0") + operator : ""), [firstNumber, operator]);
	const bottomContent = useMemo(() => (operator ? (secondNumber ? secondNumber : "0") : firstNumber !== undefined ? firstNumber : "0"), [firstNumber, operator, secondNumber]);

	return (
		<section className='calculatorResult' onClick={copyContent}>
			<p className='calculatorTop' css={paragraphStyles}>
				{topContent}
			</p>
			<p className='CalculatorBottom'>{bottomContent}</p>
		</section>
	);
};

export default CalculatorResult;
