import styled, {keyframes} from 'styled-components';
import SelectFurnitureModalImg from '../../../assets/Modal/SelectFurnitureModal.svg';

import {ModalContentProps, ModalWrapperProps} from '../../../type/type';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// ModalWrapper 컴포넌트에 ModalWrapperProps 타입을 적용하여 show 프로퍼티를 사용할 수 있도록 했습니다.
const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 999;
`;



const ModalContent = styled.div<ModalContentProps>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${SelectFurnitureModalImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 624px 350px;
    box-sizing: border-box;
    padding: 15px;
    width: 624px;
    height: 350px;
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
  color: #572e16;
  font-size: 20px;
  overflow-y: auto;
  white-space: pre;
  overflow: hidden;
`;

export const S = {
  fadeIn,
  fadeOut,
  ModalWrapper,
  ModalContent,
  ModalInnerContent,
  ModalTitle,
};
