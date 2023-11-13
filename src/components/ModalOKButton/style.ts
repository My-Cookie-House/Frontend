import { styled } from "styled-components";
import ModalOKButtonImg from "../../assets/Button/ModalOKButton.svg";

const ModalOKButton = styled.button`
  font-weight: normal; // 명시적으로 굵기 설정
  width: 192px;
  height: 58px;
  background-size: cover; // 이미지가 버튼에 맞게 조절
  border-radius: 15px;
  font-size: 20px;
  border: 0px transparent; // 테두리 색상을 투명
  position: relative;
  z-index: 2;
  border: 10px dotted;
  border-color: #572E16;
  background-image: url(${ModalOKButtonImg});
`;

export const S = {
    ModalOKButton
}