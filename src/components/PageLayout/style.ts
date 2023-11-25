import styled from 'styled-components';
import Background from '../../assets/Background/Background.webp';
import SplashScreenBackground from '@/assets/SplashScreenAssets/SplashScreenBackground.webp';

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #8a6149;
  min-height: 852px;
  overflow-y: hidden;
  overflow-x: hidden;
`;
export const BgWrapper = styled.div<{isSplashScreen?: boolean}>`
  width: 575px;
  height: 1024px;
  background: ${(props) =>
    props.isSplashScreen
      ? `url(${SplashScreenBackground})`
      : `url(${Background})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
export const Wrapper = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// TODO: 로고 추가 필요
export const LogoImg = styled.img`
  width: 80px;
  height: 46px;
  cursor: pointer;
`;

export const Nav = styled.nav`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 6px;
  margin-bottom: 3px;
  padding: 0 17px;
`;

export const IcingImg = styled.img`
  width: 100%;
  height: 15px;
  position: absolute;
  left: 0;
  top: 55px;
`;

export const ButtonBox = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 42px;
`;

export const GoBackContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 42px;
`;

export const LeftButtonImage = styled.img`
  margin-right: 10px;
  @media (max-width: 768px) {
    display: none; /* 모바일 화면일 때 숨김 */
  }
`;

export const RightButtonImage = styled.img`
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  width: 25px;
  height: 19px;
  position: relative;
`;

export const Alarm = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: -7px;
  right: -7px;
`;
