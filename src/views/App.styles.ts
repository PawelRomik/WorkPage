import { css } from "@emotion/react";

export const appStyles = (color: string) => css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Arial, Helvetica, sans-serif;
	}

	:root {
		--toastify-color-info: ${color};
		--toastify-color-success: ${color};
		--toastify-color-warning: ${color};
		--toastify-color-error: ${color};
	}

	& #root {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		resize: none;
	}
`;

export const swalStyles = (darkMode: boolean, color: string) => css`
	& .swal2-popup .swal2-styled:focus,
	& .swal2-close:focus,
	& .swal2-input:focus {
		box-shadow: none !important;
	}
	& .swal2-close:hover,
	& .swal2-close:focus {
		color: ${color} !important;
	}

	& .swal2-input:focus {
		border-color: ${color} !important;
	}

	& .swal2-actions button {
		color: ${darkMode ? "black" : "white"} !important;

		&:hover,
		&:focus {
			background-color: ${color} !important;
			color: white !important;
		}
	}
`;
