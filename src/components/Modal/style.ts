import styled, {keyframes, css} from 'styled-components';
import SmallModalImg from '../../assets/Modal/SmallModal.svg';
import MediumModalImg from '../../assets/Modal/Modal.svg';
import LargeModalImg from '../../assets/Modal/BigModal.svg';
import FurnitureSelectModalImg from '../../assets/Modal/SelectFurnitureModal.svg';
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
  display: ${(props) =>
    props.show === undefined
      ? 'block'
      : props.show === true
      ? 'block'
      : 'none'};
  z-index: 999;
  background-color: ${(props) =>
    props.imageType === 'FurnitureSelectModal'
      ? 'transparent'
      : 'rgba(87, 46, 22, 0.20)'};
`;

const getModalBackgroundImage = (
  imageType?:
    | 'SmallModal'
    | 'MediumModal'
    | 'LargeModal'
    | 'FurnitureSelectModal',
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
  imageType?:
    | 'SmallModal'
    | 'MediumModal'
    | 'LargeModal'
    | 'FurnitureSelectModal',
) => {
  switch (imageType) {
    case 'SmallModal':
      return {width: '287px', height: '170px'};
    case 'MediumModal':
      return {width: '287px', height: '394px'};
    case 'LargeModal':
      return {width: '287px', height: '617px'};
    case 'FurnitureSelectModal':
      return {width: '624px', height: '350px'};
    default:
      return {width: '287px', height: '394px'}; // 기본값
  }
};

// 아래에서 위로 올라가는 애니메이션 정의
// 세로 모드용 애니메이션
const slideUpAnimationPortrait = keyframes`
  from { transform: translate(-50%, 100%); }
  to { transform: translate(-50%, 30%); }
`;

// 가로 모드용 애니메이션
const slideUpAnimationLandscape = keyframes`
  from { transform: translate(-50%, 100%); }
  to { transform: translate(-50%, -13%); }
`;

const ModalContent = styled.div<ModalContentProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${(props) => getModalBackgroundImage(props.imageType)});
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  padding: 12px;
  ${({imageType}) => {
    const {width, height} = getModalSize(imageType);
    if (imageType === 'FurnitureSelectModal') {
      return css`
        width: ${width};
        height: ${height};
        animation: ${slideUpAnimationPortrait} 0.5s ease-out forwards;

        /* 모바일 기기에서 가로 모드일 때만 애니메이션 적용 */
        @media screen and (max-width: 768px) and (orientation: landscape) {
          animation: ${slideUpAnimationLandscape} 0.5s ease-out forwards;
        }
      `;
    } else {
      return css`
        width: ${width};
        height: ${height};
        bottom: 50%;
        transform: translate(-50%, -50%);
      `;
    }
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

export const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
`;

export const S = {
  fadeIn,
  fadeOut,
  ModalWrapper,
  ModalContent,
  ModalInnerContent,
  ModalTitle,
};
