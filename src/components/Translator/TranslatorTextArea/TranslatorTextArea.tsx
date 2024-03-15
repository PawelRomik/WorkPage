import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../../providers/SettingsContext";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import "./TranslatorTextArea.style.scss";
import { css } from "@emotion/react";
import { useMemo } from "react";

type TranslatorTextAreaProps = {
	inputValue: string;
	updateInputValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	translated: string | undefined | number;
};

const TranslatorTextArea = ({ inputValue, updateInputValue, translated }: TranslatorTextAreaProps) => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const translatorTextAreaStyles = useMemo(
		() => css`
			& {
				background-color: ${darkMode ? "white" : "rgb(54,54,54)"};
				border: 2px solid ${darkMode ? "white" : "rgb(54,54,54)"};
				color: ${darkMode ? "black" : "white"};
			}
			&:focus {
				border: 2px solid ${color};
			}
		`,
		[color, darkMode]
	);

	return (
		<section className='translatorBottomSection'>
			<textarea
				className='translateTextArea'
				id='translateTextArea'
				css={translatorTextAreaStyles}
				name='translateTextArea'
				value={inputValue}
				maxLength={1000}
				onChange={updateInputValue}
			></textarea>
			<p className='translateResult' css={translatorTextAreaStyles}>
				{translated === 0 ? (
					<div className='translatorLoading'>
						<LoadingAnimation />
						<p>{t("Translator.translatorTranslating")}</p>
					</div>
				) : (
					translated
				)}
			</p>
		</section>
	);
};

export default TranslatorTextArea;
