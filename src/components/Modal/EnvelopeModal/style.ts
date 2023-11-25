import styled from 'styled-components';
import ClosedEnvelopeImg from '@/assets/Envelope/ClosedEnvelope.webp';
import OpenedEnvelopeImg from '@/assets/Envelope/OpenedEnvelope.webp';
import {keyframes} from 'styled-components';

export const swapAnimation = keyframes`
    0%, 50% { background-image: url(${ClosedEnvelopeImg}); }
    50.01%, 100% { background-image: url(${OpenedEnvelopeImg}); }
`;

export const SwappingEnvelope = styled.div`
  width: 148px;
  height: 148px;
  background-image: url(${ClosedEnvelopeImg});
  background-size: 148px 148px;
  animation: ${swapAnimation} 1.5s infinite;
  margin-bottom: -45px;
`;

export const ModalText = styled.div`
  color: ${(props) => props.theme.colors.textBrown};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 54.01px;
  margin-bottom: 29px;
`;

export const ModalOkButtonWrapper = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
