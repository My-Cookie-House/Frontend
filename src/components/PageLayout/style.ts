import styled from 'styled-components';
import Background from '../../assets/Background/Background.svg';

export const Layout = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: #8a6149;
`;
export const Wrapper = styled.div`
  width: 393px;
  height: 852px;
  background: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; // 배경 이미지가 중앙에 위치하도록 설정
  background-attachment: scroll; // 이 부분을 추가
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
