import { keyframes, styled } from 'styled-components';
import ClosedEnvelopeImg from "../../assets/Envelope/ClosedEnvelope.svg"
import OpenedEnvelopeImg from "../../assets/Envelope/OpenedEnvelope.svg"
import ImageUploadModalImg from "../../assets/Button/ImageUploadButton.svg"

const ModalInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center; 
    justify-content: center;
    margin-top: 68px;
`;

const ModalText = styled.div`
    color: ${props => props.theme.colors.textBrown};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    margin-top: 54.01px;
    margin-bottom: 29px;
`;

const swapAnimation = keyframes`
    0%, 50% { background-image: url(${ClosedEnvelopeImg}); }
    50.01%, 100% { background-image: url(${OpenedEnvelopeImg}); }
`;

const SwappingEnvelope = styled.div`
    width: 147px;
    height: 145px;
    background-image: url(${ClosedEnvelopeImg}); 
    background-size: 147px 145px;
    animation: ${swapAnimation} 1.5s infinite;
`;

const MessageArea = styled.textarea`
    position: relative;
    width: 220px;
    height: 110px;
    border: none;
    border-radius: 10px;
    color: ${props => props.theme.colors.textBrown};
    overflow: auto;
    padding: 13px;
    resize: none;
    background-color: rgba(87, 46, 22, 0.15);
    font-size: 16px;
    &::placeholder {
        color: rgba(87, 46, 22, 0.60);
        font-size: 16px;
    }
    margin-bottom: -22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center; 
  justify-content: center;
`;

const CheckTextLength = styled.div`
margin-top: -10px;
margin-right: 30px;;
display: flex;
flex-direction: column;
align-self: flex-end;
font-size: 14px;
font-weight: 400;
color: rgba(87, 46, 22, 0.60) !important;
margin-bottom: 53px;
`;

const ImageUploadButton = styled.button`
    position: relative;
    width: 236.538px;
    height: 236.538px;
    background-image: url(${ImageUploadModalImg});
    background-size: 236.538px 236.538px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
`;

const HiddenFileInput = styled.input`
  display: none; 
`;

const ImageUploadLabel = styled.label`
  cursor: pointer; 
`;

const ImagePreview = styled.div`
  width: auto;
  height: 236.538px;
  background-size: cover;
  background-position: center;
  border-radius: 10px; 
`;

export const S = {
    ModalInnerWrapper,
    ModalText,
    SwappingEnvelope,
    Form,
    MessageArea,
    CheckTextLength,
    ImageUploadButton,
    HiddenFileInput,
    ImageUploadLabel,
    ImagePreview
}