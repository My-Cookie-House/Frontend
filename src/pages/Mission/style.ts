import { keyframes, styled } from 'styled-components';
import ClosedEnvelopeImg from "../../assets/Envelope/ClosedEnvelope.svg"
import OpenedEnvelopeImg from "../../assets/Envelope/OpenedEnvelope.svg"
import ImageUploadModalImg from "../../assets/Button/ImageUploadButton.svg"
import {ImagePreviewProps} from "../../type/type"
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

const ModalText2 = styled(ModalText)`
  margin-top: -8px; // 여기에서 원하는 margin-top 값으로 변경
`;

const swapAnimation = keyframes`
    0%, 50% { background-image: url(${ClosedEnvelopeImg}); }
    50.01%, 100% { background-image: url(${OpenedEnvelopeImg}); }
`;

const SwappingEnvelope = styled.div`
    width: 148px;
    height: 145px;
    background-image: url(${ClosedEnvelopeImg}); 
    background-size: 148px 145px;
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

const ImageUploadLabel = styled.label`
  cursor: pointer;
  width: 236.538px;
  height: 236.538px;
  background-image: url(${ImageUploadModalImg});
  background-size: cover;
  display: inline-block;
  position: relative;
  margin-bottom: 15px;
`;

const ImageInput = styled.input`
  opacity: 0; // 투명하게 설정
  position: absolute; // 절대적 위치 설정
  width: 100%;
  height: 100%;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const ImagePreview = styled.div<ImagePreviewProps>`
  width: 232px;
  height: 232px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-image: url(${(props) => props.src});
  margin-top: 2.5px;
  margin-left: 2.5px;
`;

const GuestBookEntryGrid = styled.div`
  max-height: 550px; // 최대 높이
  overflow-y: auto; // 세로 스크롤을 활성화하여 내용이 넘칠 경우 스크롤이 생김
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2개의 열
  gap: 34.71px; // 그리드 간격
  margin-bottom: 16px; // 하단 여백
  
`;


export const S = {
    ModalInnerWrapper,
    ModalText,
    SwappingEnvelope,
    Form,
    MessageArea,
    CheckTextLength,
    ImageInput,
    ImageUploadLabel,
    ImagePreview,
    GuestBookEntryGrid,
    ModalText2
}