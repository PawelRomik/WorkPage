import { logoutAnimation } from "./UserWindowLogoutAnimation.styles";
import { useClerk } from "@clerk/clerk-react";
import { useCallback } from "react";

export const UserWindowLogoutAnimation = () => {
	const { signOut } = useClerk();

	const logout = useCallback(() => {
		signOut();
	}, [signOut]);

	return <div className='logOutAnimation' onAnimationEnd={logout} css={logoutAnimation}></div>;
};
