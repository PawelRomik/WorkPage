import React, { useState } from "react";
import "./Calculator.style.scss";

const Calculator: React.FC = () => {
	const [firstNumber, setFirstNumber] = useState<string>("");
	const [secondNumber, setSecondNumber] = useState<string>("");
	const [operator, setOperator] = useState("");

	const handleAddNumber = (value: string) => {
		if (!operator) {
			setFirstNumber((prevNumber) => (prevNumber === "0" && value === "0" ? prevNumber : prevNumber + value));
		} else {
			setSecondNumber((prevNumber) => (prevNumber === "0" && value === "0" ? prevNumber : prevNumber + value));
		}
	};

	const handleAddDot = () => {
		const addDot = (number: string) => {
			if (!number) {
				return "0.";
			} else if (!number.includes(".")) {
				return number + ".";
			} else {
				return number;
			}
		};

		if (operator) {
			setSecondNumber((prevNumber) => addDot(prevNumber));
		} else {
			setFirstNumber((prevNumber) => addDot(prevNumber));
		}
	};

	const handleAddOperator = (value: string) => {
		if (!firstNumber) {
			setFirstNumber("0");
			setOperator(value);
		} else if (firstNumber && !secondNumber && !operator) {
			setOperator(value);
		} else if (operator) {
			handleCalculate(value);
		}
	};

	const handleClear = () => {
		setFirstNumber("");
		setSecondNumber("");
		setOperator("");
	};

	const handleClearEntry = () => {
		if (operator) {
			setSecondNumber("");
		} else {
			setFirstNumber("");
		}
	};

	const performOperation = (number: string, operation: string) => {
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
	};

	const handleOperation = (operation: string) => {
		if (operator) {
			if (secondNumber) setSecondNumber((prevNumber) => performOperation(prevNumber, operation));
		} else {
			if (firstNumber) setFirstNumber((prevNumber) => performOperation(prevNumber, operation));
		}
	};

	const handleCalculate = (tempOperator: string = "") => {
		try {
			let calculatedResult = firstNumber;
			if (operator) {
				calculatedResult = secondNumber ? eval(`${firstNumber}${operator}${secondNumber}`) : eval(`${firstNumber}${operator}0`);
				if (!isFinite(Number(calculatedResult)) || isNaN(Number(calculatedResult)) || Number(calculatedResult) === 0) {
					calculatedResult = "";
				}
			}
			if (tempOperator) {
				setOperator(tempOperator);
			} else {
				setOperator("");
			}

			setFirstNumber(calculatedResult.toString());
			setSecondNumber("");
		} catch (error) {
			setFirstNumber("");
			setSecondNumber("");
			setOperator("");
		}
	};

	return (
		<div className='calculator'>
			<section className='calculatorResult'>
				{operator ? (
					<>
						<p className='calculatorTop'>
							{firstNumber ? firstNumber : "0"}
							{operator ? operator : ""}
						</p>
						<p className='CalculatorBottom'>{operator ? (secondNumber ? secondNumber : "0") : ""}</p>
					</>
				) : (
					<>
						<p className='CalculatorBottom'>{firstNumber ? firstNumber : "0"}</p>
					</>
				)}
			</section>
			<section className='calculatorButtons'>
				<button className='calculatorButton' onClick={() => handleOperation("percent")}>
					<i className='fa-solid fa-percent'></i>
				</button>
				<button className='calculatorButton' onClick={() => handleClearEntry()}>
					CE
				</button>
				<button className='calculatorButton' onClick={() => handleClear()}>
					C
				</button>
				<button className='calculatorButton' onClick={() => handleOperation("removeLast")}>
					<i className='fa-solid fa-delete-left'></i>
				</button>
				<button className='calculatorButton' onClick={() => handleOperation("oneX")}>
					1/x
				</button>
				<button className='calculatorButton' onClick={() => handleOperation("pow")}>
					<i className='fa-solid fa-xmark'>
						<sup>2</sup>
					</i>
				</button>
				<button className='calculatorButton' onClick={() => handleOperation("square")}>
					<i className='fa-solid fa-square-root-variable'></i>
				</button>
				<button className='calculatorButton' onClick={() => handleAddOperator("/")}>
					<i className='fa-solid fa-divide'></i>
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("7")}>
					7
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("8")}>
					8
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("9")}>
					9
				</button>
				<button className='calculatorButton' onClick={() => handleAddOperator("*")}>
					<i className='fa-solid fa-xmark'></i>
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("4")}>
					4
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("5")}>
					5
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("6")}>
					6
				</button>
				<button className='calculatorButton' onClick={() => handleAddOperator("-")}>
					-
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("1")}>
					1
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("2")}>
					2
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("3")}>
					3
				</button>
				<button className='calculatorButton' onClick={() => handleAddOperator("+")}>
					+
				</button>
				<button className='calculatorButton' onClick={() => handleOperation("minusNumber")}>
					+/-
				</button>
				<button className='calculatorButton' onClick={() => handleAddNumber("0")}>
					0
				</button>
				<button className='calculatorButton' onClick={() => handleAddDot()}>
					.
				</button>
				<button className='calculatorButton' onClick={() => handleCalculate()}>
					=
				</button>
			</section>
		</div>
	);
};

export default Calculator;
