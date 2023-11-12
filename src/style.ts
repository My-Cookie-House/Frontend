import { createGlobalStyle } from "styled-components";
import Pretendard from "./static/font/Pretendard-Medium.woff2";
import Background from "./assets/Background/Background.svg"
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
    background: url(${Background});
    width: 100%;
    height: 1080px;
    background-repeat: no-repeat;
    background-size: 976.056px 1080px;
    background-position: center; // 배경 이미지가 중앙에 위치하도록 설정
    background-attachment: scroll; // 이 부분을 추가
    background-color: #8a6149;
  }

  #content {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
  }
`;
