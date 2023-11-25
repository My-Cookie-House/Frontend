import {createGlobalStyle} from 'styled-components';
import Pretendard from './static/font/Pretendard-Medium.woff2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Pretendard}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 16px; // 16px 기본 설정
    background-color:  #8a6149;
    overflow-x: hidden;
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
