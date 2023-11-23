import styled from 'styled-components';
import YesNoButton from '@/assets/Button/YesNoButton.svg';

export const ModalText = styled.div`
  color: #572e16;

  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-top: 68px;

  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

export const YesNoBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 224px;
`;

export const YesNoBtn = styled.button`
  background: url(${YesNoButton});
  background-size: cover;
  background-position: center;
  width: 106px;
  height: 46px;
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

export const GingerManImg = styled.img`
  width: 150px;
  height: 150px;
`;
