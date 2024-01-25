import { useMemo } from "react";
import "./CalculatorResult.style.scss";

type CalculatorResultProps = {
	firstNumber: string | undefined;
	operator: string | undefined;
	secondNumber: string | undefined;
	copyContent: () => void;
};

const CalculatorResult = ({ firstNumber, operator, secondNumber, copyContent }: CalculatorResultProps) => {
	const topContent = useMemo(() => (operator ? (firstNumber !== undefined ? firstNumber : "0") + operator : ""), [firstNumber, operator]);
	const bottomContent = useMemo(() => (operator ? (secondNumber ? secondNumber : "0") : firstNumber !== undefined ? firstNumber : "0"), [firstNumber, operator, secondNumber]);

	return (
		<section className='calculatorResult' onClick={copyContent}>
			<p className='calculatorTop'>{topContent}</p>
			<p className='CalculatorBottom'>{bottomContent}</p>
		</section>
	);
};

export default CalculatorResult;
