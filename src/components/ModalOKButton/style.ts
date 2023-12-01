import {styled} from 'styled-components';
import ModalOKButtonImg from '../../assets/Button/ModalOKButton.webp';

const ModalOKButton = styled.button`
  font-weight: normal; // 명시적으로 굵기 설정
  width: 152px;
  height: 48px;
  background-size: cover;
  font-size: 16px;
  font-weight: 700;
  border: 0px transparent; // 테두리 색상을 투명
  position: relative;
  z-index: 2;
  color: ${(props) => props.theme.colors.textMain};
  background-color: transparent;
  background-image: url(${ModalOKButtonImg});
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
`;

export const S = {
  ModalOKButton,
};
