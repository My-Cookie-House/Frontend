import {createGlobalStyle} from 'styled-components';
import Pretendard from './static/font/Pretendard-Medium.woff2';
import Background from './assets/Background/Background.svg';
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Pretendard}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 16px; // 16px 기본 설정

  }

  body, html {
    font-family: 'Pretendard';
    font-weight: 700;
    margin: 0;
    font-size: 16px;

  }

  #content {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
  }
`;
