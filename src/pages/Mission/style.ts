import { keyframes, styled } from 'styled-components';
import ClosedEnvelopeImg from "../../assets/Envelope/ClosedEnvelope.svg"
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


export const S = {
    ModalInnerWrapper,
    ModalText,
    SwappingEnvelope
}