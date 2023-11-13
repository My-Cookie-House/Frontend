import styled, { keyframes } from 'styled-components';
import ModalImg from '../../assets/Modal/Modal.svg';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// show 프로퍼티를 갖는 ModalWrapperProps 인터페이스를 정의했습니다.
interface ModalWrapperProps {
    show: boolean;
  }
// ModalWrapper 컴포넌트에 ModalWrapperProps 타입을 적용하여 show 프로퍼티를 사용할 수 있도록 했습니다.
const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${ModalImg});
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box; 
  padding: 15px;
  width: 311px;
  height: 418px;
  color: #572E16; 
  font-size: 20px;
  overflow-y: auto; 
  
`;

const ModalInnerContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ModalTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  color: #572E16; 
  font-size: 20px;
  overflow-y: auto; 
  
`;


export const S = {
    fadeIn,
    fadeOut,
    ModalWrapper,
    ModalContent,
    ModalInnerContent,
    ModalTitle
}