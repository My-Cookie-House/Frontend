import { styled } from "styled-components";
import ModalOKButtonImg from "../../assets/Button/ModalOKButton.svg";

const ModalOKButton = styled.button`
  font-weight: normal; // 명시적으로 굵기 설정
  width: 162px;
  height: 57px;
  background-size: 162px 57px; // 이미지가 버튼에 맞게 조절
  font-size: 16px;
  font-weight: 700;
  border: 0px transparent; // 테두리 색상을 투명
  position: relative;
  z-index: 2;
  color: ${props => props.theme.colors.textMain};
  background-color: transparent;
  background-image: url(${ModalOKButtonImg});
`;

export const S = {
    ModalOKButton
}