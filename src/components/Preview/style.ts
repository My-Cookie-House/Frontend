import styled from 'styled-components';

export const Frame = styled.div<{
  width: number;
  height: number;
  margin?: string;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  background: none;
  padding: 0;
  margin: ${(props) => `${props.margin}` || 0};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
