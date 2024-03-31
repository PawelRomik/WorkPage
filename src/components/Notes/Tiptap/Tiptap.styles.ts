import { css } from "@emotion/react";

export const noteEditStyles = () => css`
	&.noteEdit {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const noteInfoStyles = (darkMode: boolean) => css`
	&.noteInfo {
		color: ${darkMode ? "black" : "white"};
		font-weight: bold;
	}

	@media (min-width: 768px) {
		&.noteInfo {
			font-size: 2rem;
		}
	}
`;

export const tiptapStyles = (darkMode: boolean) => css`
	&.tiptap {
		display: flex;
		align-items: center;
		position: relative;
		flex-direction: column;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-size: 1rem;
		outline: none;
		resize: none;
		background-color: white;

		&.tiptap > div:nth-of-type(3) {
			width: 100%;
			margin: 0;
			flex: 1;
			position: relative;
		}

		& .ProseMirror {
			margin: 0;
			height: 100%;
			font-size: 1rem;
			outline: none;
			resize: none;
			padding: 0.5rem;
			position: absolute;
			overflow-y: auto;
			width: 100%;
			top: 0;
			left: 0;
			border: 2px solid lightgray;
			display: block;
			white-space: pre-wrap;
			word-wrap: break-word;
			background-color: ${darkMode ? "#dfdfdf" : "rgb(27, 27, 27)"};
			color: ${darkMode ? "black" : "white"};
			border: 4px solid ${darkMode ? "white" : "black"};
		}

		& > * + & * {
			margin-top: 0.75em;
		}

		& ul,
		& ol {
			padding: 0 1rem;
		}

		& h1,
		& h2,
		& h3,
		& h4,
		& h5,
		& h6 {
			line-height: 1.1;
		}

		& code {
			background-color: rgba(#616161, 0.1);
			color: #616161;
		}

		& pre {
			background: #0d0d0d;
			color: #fff;
			font-family: "JetBrainsMono", monospace;
			padding: 0.75rem 1rem;
			border-radius: 0.5rem;

			code {
				color: inherit;
				padding: 0;
				background: none;
				font-size: 0.8rem;
			}
		}

		& img {
			max-width: 100%;
			height: auto;
		}

		& blockquote {
			padding-left: 1rem;
			border-left: 2px solid rgba(#0d0d0d, 0.1);
		}

		& hr {
			border: none;
			border-top: 2px solid rgba(#0d0d0d, 0.1);
			margin: 2rem 0;
		}
	}

	@media (min-width: 768px) {
		&.tiptap {
			font-size: 1.25rem;

			& .ProseMirror {
				font-size: 1.25rem;
			}
		}
	}
`;
