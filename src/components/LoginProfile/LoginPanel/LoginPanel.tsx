import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { loginButtonStyles, loginPanelStyles } from "./LoginPanel.styles";
import { LoginPanelSignedOut } from "./LoginPanelSignedOut/LoginPanelSignedOut";
import { LoginPanelSignedIn } from "./LoginPanelSignedIn/LoginPanelSignedIn";
import { useSettingsContext } from "../../../providers/SettingsContext";

type LoginPanelProps = {
	handleLogin: () => void;
};

export const LoginPanel = ({ handleLogin }: LoginPanelProps) => {
	const { darkMode, color } = useSettingsContext();
	return (
		<div className='loginPanel' css={[loginPanelStyles, loginButtonStyles(darkMode, color)]}>
			<SignedOut>
				<LoginPanelSignedOut />
			</SignedOut>

			<SignedIn>
				<LoginPanelSignedIn handleLogin={handleLogin} />
			</SignedIn>
		</div>
	);
};
