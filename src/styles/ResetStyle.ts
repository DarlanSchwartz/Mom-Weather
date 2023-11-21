import { createGlobalStyle } from "styled-components";

const ResetStyle = createGlobalStyle`
html, body, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
	}
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
    #root{
        min-height: 100%;
		max-height: fit-content;
    }
	body {
		line-height: 1;
	}
    body,html{
		height: 100%;
        min-height: 100% !important;
    }
    img{
        max-width:100%;
        height: auto;
        vertical-align: middle;
        font-style: italic;
        background-repeat: no-repeat;
        background-size: cover;
        shape-margin: 0.75rem;
    }
    table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
    input{
        &:focus{
            outline: none;
        }
    }
	.swal2-image{
		object-fit: cover;
	}

    button{
        cursor: pointer;
        user-select: none;
        &:disabled{
            cursor: not-allowed;
        }
    }
	.swal2-container-terms-of-service{

	}
	.swal2-checkbox{
		cursor: pointer;
	}
	.swal2-title-terms-of-service{
		font-size: 20px;
	}
	.swal2-popup-terms-of-service{
		width: 100%;
		max-width: 550px;
		padding-top: 20px;
	}

	.swal2-input-label-terms-of-service{
		font-size: 12px;
	}

    * {
        font-family: 'Poppins', sans-serif;
        transition: all 200ms;
        box-sizing: border-box;
		&::-webkit-scrollbar {
			width: 10px;
			background-color: #BAFB8E;
			opacity: 0.5;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 1px;
		}
    }
`;

export default ResetStyle;