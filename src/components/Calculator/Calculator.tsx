import React, { useCallback, useState } from "react";
import "./Calculator.style.scss";
import CalculatorButtons from "./CalculatorButtons/CalculatorButtons";
import CalculatorResult from "./CalculatorResult/CalculatorResult";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Calculator: React.FC = () => {
	const [firstNumber, setFirstNumber] = useState<string | undefined>(undefined);
	const [secondNumber, setSecondNumber] = useState<string | undefined>(undefined);
	const [operator, setOperator] = useState<string | undefined>(undefined);
	const { t } = useTranslation();

	const handleAddNumber = useCallback(
		(value: string) => {
			operator
				? setSecondNumber((prevNumber) => (prevNumber !== undefined ? (prevNumber === "0" && value === "0" ? prevNumber : prevNumber + value) : value))
				: setFirstNumber((prevNumber) => (prevNumber !== undefined ? (prevNumber === "0" && value === "0" ? prevNumber : prevNumber + value) : value));
		},
		[operator]
	);

	const handleAddDot = useCallback(() => {
		const addDot = (number: string | undefined) => {
			switch (true) {
				case !number:
					return "0.";
				case number && !number.includes("."):
					return number + ".";
				default:
					return number;
			}
		};

		operator ? setSecondNumber((prevNumber) => addDot(prevNumber)) : setFirstNumber((prevNumber) => addDot(prevNumber));
	}, [operator]);

	const handleCalculate = useCallback(
		(tempOperator: string = "") => {
			try {
				let calculatedResult = firstNumber;
				if (operator) {
					calculatedResult = secondNumber ? eval(`${firstNumber}${operator}${secondNumber}`) : eval(`${firstNumber}${operator}0`);
					if (!isFinite(Number(calculatedResult)) || isNaN(Number(calculatedResult)) || Number(calculatedResult) === 0) {
						calculatedResult = undefined;
					}
				}
				tempOperator ? setOperator(tempOperator) : setOperator(undefined);
				setSecondNumber(undefined);
				calculatedResult ? setFirstNumber(calculatedResult.toString()) : setFirstNumber(undefined);
			} catch (error) {
				setFirstNumber(undefined);
				setSecondNumber(undefined);
				setOperator(undefined);
			}
		},
		[firstNumber, secondNumber, operator]
	);

	const handleAddOperator = useCallback(
		(value: string) => {
			switch (true) {
				case !firstNumber:
					setFirstNumber("0");
					setOperator(value);
					break;
				case firstNumber && !secondNumber && !operator:
					setOperator(value);
					break;
				case operator !== undefined:
					handleCalculate(value);
					break;
				default:
					break;
			}
		},
		[firstNumber, secondNumber, operator, handleCalculate]
	);

	const handleClear = useCallback(() => {
		setFirstNumber(undefined);
		setSecondNumber(undefined);
		setOperator(undefined);
	}, []);

	const handleClearEntry = useCallback(() => {
		operator ? setSecondNumber(undefined) : setFirstNumber(undefined);
	}, [operator]);

	const performOperation = useCallback((number: string, operation: string) => {
		switch (operation) {
			case "percent":
				return (Number(number) / 100).toString();
			case "removeLast":
				return number.slice(0, -1);
			case "oneX":
				return (1 / Number(number)).toString();
			case "pow":
				return Math.pow(Number(number), 2).toString();
			case "square":
				return Math.sqrt(Number(number)).toString();
			case "minusNumber":
				return (Number(number) * -1).toString();
			default:
				return number;
		}
	}, []);

	const handleOperation = useCallback(
		(operation: string) => {
			operator
				? secondNumber !== undefined && setSecondNumber((prevNumber) => (prevNumber ? performOperation(prevNumber, operation) : undefined))
				: firstNumber !== undefined && setFirstNumber((prevNumber) => (prevNumber ? performOperation(prevNumber, operation) : undefined));
		},
		[firstNumber, secondNumber, performOperation, operator]
	);

	const copyContent = useCallback(() => {
		const result = firstNumber !== undefined ? firstNumber : "0";
		navigator.clipboard.writeText(result);
		toast.success(t("Calculator.toastCopiedCalculator"));
	}, [firstNumber, t]);

	return (
		<div className='calculator'>
			<CalculatorResult firstNumber={firstNumber} operator={operator} secondNumber={secondNumber} copyContent={copyContent} />
			<CalculatorButtons
				handleOperation={handleOperation}
				handleAddNumber={handleAddNumber}
				handleAddOperator={handleAddOperator}
				handleAddDot={handleAddDot}
				handleClear={handleClear}
				handleClearEntry={handleClearEntry}
				handleCalculate={handleCalculate}
			/>
		</div>
	);
};

export default Calculator;
