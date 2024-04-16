import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../../../providers/SettingsContext";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { useCallback } from "react";
import { launchToast } from "../../../utils/toastFunction";
import { translatorTextAreaStyles } from "./TranslatorTextArea.styles";

type TranslatorTextAreaProps = {
	inputValue: string;
	updateInputValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	translated: string | undefined | number;
};

export const TranslatorTextArea = ({ inputValue, updateInputValue, translated }: TranslatorTextAreaProps) => {
	const { color, darkMode } = useSettingsContext();
	const { t } = useTranslation();

	const copyContent = useCallback(() => {
		if (translated && typeof translated === "string") navigator.clipboard.writeText(translated);
		launchToast("success", t("Translator.toastCopiedTranslator"));
	}, [translated, t]);

	return (
		<section className='translatorBottomSection' css={translatorTextAreaStyles(darkMode, color)}>
			<textarea className='translateTextArea' id='translateTextArea' name='translateTextArea' value={inputValue} maxLength={1000} onChange={updateInputValue}></textarea>
			<div className='translateResult'>
				{translated === 0 ? (
					<div className='translatorLoading'>
						<LoadingAnimation />
						<p>{t("Translator.translatorTranslating")}</p>
					</div>
				) : (
					<p className='translateResultParagraph' onClick={copyContent} title={t("Translator.translatorCopyHover")}>
						{translated}
					</p>
				)}
			</div>
		</section>
	);
};
