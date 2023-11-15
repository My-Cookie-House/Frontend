import styled from 'styled-components';
import ShareLinkBgImg from '../../../assets/ShareAssets/ShareLinkBg.svg';
import ShareBtnImg from '../../../assets/ShareAssets/ShareButton.svg';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ShareLinkBg = styled.div`
  background: url(${ShareLinkBgImg});
  background-size: cover;
  width: 237.5px;
  height: 50px;
  position: relative;
  margin-top: 82px;
  padding: 0;
`;
export const ShareBtn = styled.button`
  background: url(${ShareBtnImg});
  background-size: cover;
  background-position: center;
  width: 68px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  outline: none;
  padding: 0;
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

export const Link = styled.p`
  color: #572e16;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow-x: scroll;
  margin-left: 15px;
`;
