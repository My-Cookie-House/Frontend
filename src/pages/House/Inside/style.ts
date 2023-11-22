import styled from 'styled-components';

export const ShareImg = styled.img`
  width: 19px;
  height: 19px;
`;

export const Frame = styled.div`
  width: 300px;
  height: 400px;
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
