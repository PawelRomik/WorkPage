import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { calculatorResultStyles, calculatorTopStyles, calculatorBottomStyles } from "./CalculatorResult.styles";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { launchToast } from "../../../utils/toastFunction";

type CalculatorResultProps = {
	firstNumber: string | undefined;
	operator: string | undefined;
	secondNumber: string | undefined;
};

export const CalculatorResult = ({ firstNumber, operator, secondNumber }: CalculatorResultProps) => {
	const { t } = useTranslation();
	const { color, darkMode } = useSettingsContext();

	const copyContent = useCallback(() => {
		const result = firstNumber !== undefined ? firstNumber : "0";
		navigator.clipboard.writeText(result);
		launchToast("success", t("Calculator.toastCopiedCalculator"));
	}, [firstNumber, t]);

	const topContent = useMemo(() => (operator ? (firstNumber !== undefined ? firstNumber : "0") + operator : ""), [firstNumber, operator]);
	const bottomContent = useMemo(() => (operator ? (secondNumber ? secondNumber : "0") : firstNumber !== undefined ? firstNumber : "0"), [firstNumber, operator, secondNumber]);

	return (
		<section className='calculatorResult' onClick={copyContent} title={t("Calculator.calculatorCopyHover")} css={calculatorResultStyles(darkMode)}>
			<p className='calculatorTop' css={calculatorTopStyles(color)}>
				{topContent}
			</p>
			<p className='CalculatorBottom' css={calculatorBottomStyles}>
				{bottomContent}
			</p>
		</section>
	);
};
