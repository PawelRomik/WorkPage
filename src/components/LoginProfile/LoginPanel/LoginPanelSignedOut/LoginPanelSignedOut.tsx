import { SignUpButton } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";

export const LoginPanelSignedOut = () => {
	const { t } = useTranslation();

	return (
		<div className='loginButtons'>
			<SignUpButton afterSignInUrl='/' afterSignUpUrl='/'>
				<button className='loginJoinButton' aria-label='Login'>
					{t("LoginProfile.loginIn")}
				</button>
			</SignUpButton>
			<SignUpButton afterSignInUrl='/' afterSignUpUrl='/'>
				<button aria-label='Login' className='signInButton'>
					<i className='fa-solid fa-arrow-right-to-bracket'></i>
				</button>
			</SignUpButton>
		</div>
	);
};
