import styled from 'styled-components';
import theme from '../../../theme';

export const ModalText = styled.div`
  color: ${(props) => props.theme.colors.textBrown};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 54px;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const ImgBox = styled.div<{src: string}>`
  position: relative;
  width: 236.538px;
  height: 236.538px;
  background-image: ${(props) => `url(${props.src})`};
  border: 2px dashed #572e16;
  border-radius: 10px;
  background-size: contain;
`;

export const Label = styled.p`
  color: #572e16;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-top: 13px;
`;

export const Line = styled.div`
  width: 237px;
  height: 3px;
  background-color: rgba(87, 46, 22, 0.4);
  margin-top: 7px;
`;

export const MessageArea = styled.div`
  position: relative;
  width: 220px;
  height: 150px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.textBrown};
  overflow: auto;
  padding: 13px;
  resize: none;
  background-color: rgba(87, 46, 22, 0.15);
  font-size: 16px;
  margin-bottom: -22px;
  margin-top: 18px;
`;
