import { styled } from "styled-components"; 
import ClosedEnvelopeImg from "../../assets/Envelope/ClosedEvelope.svg"
import OpenedEnvelopeImg from "../../assets/Envelope/OpenedEnvelope.svg"

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



export const S = {
    ModalInnerWrapper,
    ModalText
}