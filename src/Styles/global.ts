// global.js
import { createGlobalStyle } from 'styled-components';

import CircularBook from '../Assets/Fonts/Circular/CircularStd-Book.otf';
import CircularSemiBold from '../Assets/Fonts/Circular/CircularStd-Medium.otf';
import CircularBold from '../Assets/Fonts/Circular/CircularStd-Bold.otf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Circular-Book';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Circular Book'),local('Circular-Book'),
        url(${CircularBook}) format('opentype');
  }

  @font-face {
    font-family: 'Circular-SemiBold';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Circular SemiBold'),local('Circular-SemiBold'),
        url(${CircularSemiBold}) format('opentype');
  }

  @font-face {
    font-family: 'Circular-Bold';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Circular Bold'),local('Circular-Bold'),
        url(${CircularBold}) format('opentype');
  }

  @font-face {
    font-family: 'Circular';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Circular Book'),local('Circular-Book'),
        url(${CircularBook}) format('opentype');
  }

  @font-face {
    font-family: 'Circular';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Circular SemiBold'),local('Circular-SemiBold'),
        url(${CircularSemiBold}) format('opentype');
  }

  @font-face {
    font-family: 'Circular';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Circular Bold'),local('Circular-Bold'),
        url(${CircularBold}) format('opentype');
  }

  html, body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body{
    font-family: ${({ theme }) => theme.fonts.CIRCULAR_ALL};
    font-size: 14px;

    input:-webkit-autofill,
	  input:-webkit-autofill:hover,
  	input:-webkit-autofill:focus,
	  input:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
		/* -webkit-text-fill-color: transparent; */
	  }
  }

  a,button,input, select, text-area, div, p, li, h1, h2, h3, h4, h5, h6, span{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    letter-spacing: 0.5px;
  }

  p, h1, h2, h3, h4, h5, h6{
    margin: 0
  }
`;
