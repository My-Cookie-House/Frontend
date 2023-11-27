import { ButtonProps } from '@/interfaces/guestBook';
import styled from 'styled-components';



export const Button = styled.button<ButtonProps>`
  background: url(${props => props.img});
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  border: none;
  position: fixed;
  width: 83px;
  height: 83px;
  bottom: 20px;
  right: 20px;
  z-index: 9;
  cursor: pointer;
`;
