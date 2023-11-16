import styled, {keyframes} from 'styled-components';
import SmallModalImg from '../../assets/Modal/SmallModal.svg';
import MediumModalImg from '../../assets/Modal/Modal.svg';
import LargeModalImg from '../../assets/Modal/BigModal.svg';
import FurnitureSelectModalImg from '../../assets/Modal/SelectFurnitureModal.svg'
import {ModalContentProps, ModalWrapperProps} from '../../type/type';

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
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

const getModalBackgroundImage = (
  imageType?: 'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal',
) => {
  switch (imageType) {
    case 'SmallModal':
      return SmallModalImg;
    case 'MediumModal':
      return MediumModalImg;
    case 'LargeModal':
      return LargeModalImg;
    case 'FurnitureSelectModal':
      return FurnitureSelectModalImg;
    default:
      return LargeModalImg;
  }
};

const getModalSize = (
  imageType?: 'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal',
) => {
  switch (imageType) {
    case 'SmallModal':
      return {width: '311px', height: '339px'};
    case 'MediumModal':
      return {width: '311px', height: '418px'};
    case 'LargeModal':
      return {width: '311px', height: '617px'};
    case 'FurnitureSelectModal':
      return {width: '624px', height: '350px'};
    default:
      return {width: '311px', height: '418px'}; // 기본값
  }
};

const ModalContent = styled.div<ModalContentProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${(props) => getModalBackgroundImage(props.imageType)});
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  padding: 15px;
  ${({imageType}) => {
    const {width, height} = getModalSize(imageType);
    return `
      width: ${width};
      height: ${height};
      bottom: ${imageType === 'FurnitureSelectModal' ? '0' : '50%'};
      transform: ${imageType === 'FurnitureSelectModal' ? 'translate(-50%, 35%)' : 'translate(-50%, -50%)'};
    `;
  }}
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
