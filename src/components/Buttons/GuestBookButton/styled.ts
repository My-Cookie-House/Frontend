import styled from 'styled-components';
import ButtonImg from '@/assets/GuestBook/Button.png';

export const Button = styled.button`
  background: url(${ButtonImg});
  background-size: cover;
  width: 83px;
  height: 83px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9;
  cursor: pointer;
`;
