import React from 'react';
import {S} from './style';
import {ModalProps} from '../../type/type';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalTitle,
  imageType,
}) => {
  return (
    <S.ModalWrapper show={isOpen} onClick={onClose}>
      <S.ModalContent
        onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
        imageType={imageType}
      >
        <S.ModalInnerContent>
          <S.ModalTitle>{modalTitle}</S.ModalTitle>
          {children}
        </S.ModalInnerContent>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
