import { css } from "@emotion/react";

export const SettingsUsersDataRightStyles = () => css`
	&.usersDataRight {
		position: relative;

		& .avatarBox {
			position: relative;

			& .avatarFileInput {
				position: absolute;
				opacity: 0;
				cursor: pointer;
				width: 100%;
				height: 100%;
			}

			& img {
				width: 5rem;
				height: 5rem;
				border-radius: 300px;
				border: 2px solid white;
			}
		}
	}

	@media (min-width: 768px) {
		&.usersDataRight {
			& .avatarBox img {
				width: 8rem;
				height: 8rem;
			}
		}
	}
`;
