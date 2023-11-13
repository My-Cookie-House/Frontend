import { styled } from "styled-components"; 
import WirteGuestBookButtonImg from '../../assets/Button/WriteGuestBookButton.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    width: 304px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WirteGuestBookButton = styled.div`
    position: absolute;
    top: 241px;
    left: 257px;
    width: 24px;
    height: 24px;
    background-image: url(${WirteGuestBookButtonImg});
    background-size: 24px 24px;
    z-index: 3;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center; 
  justify-content: center;
`;

const NameInput = styled.input`
//position: absolute;
margin-top: 60px;
width: 304px;
height: 64px;
border: dotted;
border-color: #572E16;
border-radius: 30px;
color: #572E16;
margin-bottom: 32px;
background-color: transparent;
font-size: 16px;
`;

const CheckTextLength = styled.div`
margin-top: -60px;
margin-right: 20px;;
display: flex;
flex-direction: column;
color: #666 !important;
align-self: flex-end;   // 이 부분을 추가
font-size: 14px;
font-weight: 400;
color: rgba(87, 46, 22, 0.60);
`;

const LetterArea = styled.textarea`
width: 274px;
height: 149px;
border: none;
color: #222;
overflow: auto;
margin-bottom: 20px;
padding: 13px;
resize: none;
background-color: rgba(87, 46, 22, 0.15);
font-size: 16px;

`;

const SendButton = styled.button`
  font-weight: normal; // 명시적으로 굵기 설정
  width: 192px;
  height: 58px;
  background-size: cover; // 이미지가 버튼에 맞게 조절
  border-radius: 15px;
  font-size: 20px;
  border: 0px transparent; // 테두리 색상을 투명
  position: relative;
  z-index: 2;
  border: dotted;
  border-color: #572E16;
`;


export const S = {
    Container,
    WirteGuestBookButton,
    ButtonWrapper,
    Form,
    NameInput,
    CheckTextLength,
    LetterArea,
    SendButton
}