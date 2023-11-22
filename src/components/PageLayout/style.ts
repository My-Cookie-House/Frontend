import styled from 'styled-components';
import Background from '../../assets/Background/Background.png';
import SplashScreenBackground from '@/assets/SplashScreenAssets/SplashScreen.png';

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
`;
export const Wrapper = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 19px;
`;
// TODO: 로고 추가 필요
export const LogoImg = styled.img`
  width: 110px;
  height: 64px;
`;

export const Nav = styled.nav`
  width: 340px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const IcingImg = styled.img`
  width: 100%;
  height: 15px;
`;

export const ButtonBox = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
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
