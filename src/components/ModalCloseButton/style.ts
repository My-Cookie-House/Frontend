import {styled} from 'styled-components';
import ModalCloseButtonImg from '../../assets/Button/ModalCloseButton.svg';

const ModalCloseButton = styled.button`
  position: absolute;
  top: 22px;
  right: 25px;
  width: 26px;
  height: 26px;
  background-image: url(${ModalCloseButtonImg});
  background-size: 26px 26px;
  text-align: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const S = {
  ModalCloseButton,
};
