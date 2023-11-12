import React from 'react';
import {s} from "./style";

// children 프로퍼티 포함하도록 ModalProps 인터페이스를 수정했습니다.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <s.ModalWrapper show={isOpen} onClick={onClose}>
      <s.ModalContent onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
        <s.ModalInnerContent>
        {children}
        </s.ModalInnerContent>
      </s.ModalContent>
    </s.ModalWrapper>
  );
};

export default Modal;