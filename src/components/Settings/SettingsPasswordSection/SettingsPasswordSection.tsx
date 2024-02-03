import { useMemo } from "react";
import "./SettingsPasswordSection.style.scss";
import { css } from "@emotion/react";
import { useSettingsContext } from "../../../providers/SettingsContext";

type SettingsPasswordSectionProps = {
	password: string;
	oldPassword: string;
	newPassword: string;
	unlock: (e: React.MouseEvent<HTMLButtonElement>) => void;
	changePass: () => void;
	unsetPass: () => void;
	handleOldPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SettingsPasswordSection = ({
	password,
	oldPassword,
	newPassword,
	unlock,
	changePass,
	unsetPass,
	handleNewPasswordChange,
	handleOldPasswordChange,
}: SettingsPasswordSectionProps) => {
	const { color } = useSettingsContext();

	const passwordButtonsStyles = useMemo(
		() => css`
			& > button:focus,
			& > button:hover {
				background-color: ${color};
			}
		`,
		[color]
	);

	const sectionTitle = useMemo(() => (password ? "CHANGE YOUR PASSWORD" : "SET YOUR PASSWORD"), [password]);
	return (
		<section className='changePasswordSection'>
			<h2>{sectionTitle}</h2>
			<div className='passContainer'>
				{password && (
					<input
						className='changePasswordInput'
						value={oldPassword}
						onChange={handleOldPasswordChange}
						type='password'
						id='oldpassword'
						name='oldpassword'
						placeholder='Old password'
					/>
				)}
				<input
					className='changePasswordInput'
					value={newPassword}
					onChange={handleNewPasswordChange}
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					placeholder='New Password'
				/>

				<div className='changePasswordButtons' css={passwordButtonsStyles}>
					{password ? (
						<>
							<button className='unlockButton' onClick={changePass}>
								Change
							</button>
							<button className='removeButton' onClick={unsetPass}>
								Remove password
							</button>
						</>
					) : (
						<button className='unlockButton' onClick={unlock}>
							Confirm
						</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default SettingsPasswordSection;
