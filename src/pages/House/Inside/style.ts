import styled from 'styled-components';

export const ShareImg = styled.img`
  width: 19px;
  height: 19px;
`;

export const Frame = styled.div`
  width: 355px;
  height: 533px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonLayer = styled.button<{
  width: string;
  height: string;
  top: string;
  left: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`;

export const ButtonText = styled.p`
  color: #572e16;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
`;
