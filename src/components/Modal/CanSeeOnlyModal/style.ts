import styled from 'styled-components';
import ModalOkButton from '@/assets/Button/ModalOKButton.png';

export const ModalText = styled.div`
  color: #572e16;
  white-space: pre-line;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-top: 48px;

  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

export const YesNoBtn = styled.button`
  background: url(${ModalOkButton});
  box-shadow: 0px 4px 4px 0px rgba(87, 46, 22, 0.60);
  background-size: cover;
  border-radius: 18px;
  background-color: transparent;
  background-position: center;
  width: 152px;
  height: 46px;
  margin-top: 25px;
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
  width: 181px;
  height: 181px;
`;
