import styled from 'styled-components';
import Background from '../../assets/Background/Background.svg';
import SplashScreenBackground from '../../assets/SplashScreenAssets/SplashScreenBackground.svg';

export const Layout = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: #8a6149;
`;
export const Wrapper = styled.div<{isSplashScreen?: boolean}>`
  width: 393px;
  height: 852px;
  background: url(${(props) =>
    props.isSplashScreen ? SplashScreenBackground : Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  padding-top: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// TODO: 로고 추가 필요
export const Logo = styled.div`
  width: 110px;
  height: 49.7px;
  background-color: gray;
  text-align: center;
`;

export const Nav = styled.nav`
  width: 340px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ButtonBox = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const GoBackContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
