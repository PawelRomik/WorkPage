import { useSettingsContext } from "../../../providers/SettingsContext";
import { calculatorButtonStyle, calculatorButtonsContainerStyle } from "./CalculatorButtons.styles";

type CalculatorButtonsProps = {
	handleOperation: (operation: string) => void;
	handleAddNumber: (value: string) => void;
	handleAddOperator: (value: string) => void;
	handleAddDot: () => void;
	handleClear: () => void;
	handleClearEntry: () => void;
	handleCalculate: () => void;
};

export const CalculatorButtons = ({
	handleOperation,
	handleAddNumber,
	handleAddOperator,
	handleAddDot,
	handleClear,
	handleClearEntry,
	handleCalculate,
}: CalculatorButtonsProps) => {
	const { color, darkMode } = useSettingsContext();

	return (
		<section className='calculatorButtonsContainer' css={[calculatorButtonsContainerStyle(darkMode), calculatorButtonStyle(darkMode, color)]}>
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
	);
};
