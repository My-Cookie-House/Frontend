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
    margin: 0 auto;
`;

const WirteGuestBookButton = styled.div`
    position: absolute;
    top: 186px;
    left: 230px;
    width: 18.933px;
    height: 18.933px;
    background-image: url(${WirteGuestBookButtonImg});
    background-size: 18.933px 18.933px;
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
width: 235px;
height: 50px;
border: dotted;
border-color: #572E16;
border-radius: 30px;
color: #572E16;
margin-bottom: 32px;
background-color: transparent;
font-size: 16px;
&::placeholder {
    color: #572E16; 
    font-size: 16px;
  }
`;

const CheckTextLength = styled.div`
margin-top: -60px;
margin-right: 20px;;
display: flex;
flex-direction: column;
align-self: flex-end;   // 이 부분을 추가
font-size: 14px;
font-weight: 400;
color: rgba(87, 46, 22, 0.60) !important;
margin-bottom: 53px;
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
&::placeholder {
    color: #572E16;
    font-size: 16px;
  }
`;



export const S = {
    Container,
    WirteGuestBookButton,
    ButtonWrapper,
    Form,
    NameInput,
    CheckTextLength,
    LetterArea,
}