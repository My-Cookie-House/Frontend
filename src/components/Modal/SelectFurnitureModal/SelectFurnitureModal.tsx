import React from 'react';
import {S} from "./style";
import { ModalProps } from '../../../type/type'


const SelectFurnitureModal: React.FC<ModalProps> = ({ isOpen, onClose, children, modalTitle }) => {
  return (
    <S.ModalWrapper show={isOpen} onClick={onClose}>
      <S.ModalContent 
      onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
      >
        <S.ModalInnerContent>
          <S.ModalTitle>
            {modalTitle}
          </S.ModalTitle>
          {children}
        </S.ModalInnerContent>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default SelectFurnitureModal;