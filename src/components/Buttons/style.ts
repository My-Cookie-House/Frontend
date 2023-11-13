import styled from 'styled-components';
import theme from '../../theme';

type ButtonStyleProps = {
  background?: string;
  width: number;
  height: number;
  margin?: string;
  padding?: string;
};

export const Button = styled.button<ButtonStyleProps>`
  background: ${(props) => props.background && `url(${props.background})`};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: ${(props) => `${props.margin}`};
  height: ${(props) => `${props.height}`};
  outline: none;
  border: none;
  z-index: 2;
  box-shadow: none;
  color: ${theme.colors.textBrown};
  cursor: pointer;
`;
