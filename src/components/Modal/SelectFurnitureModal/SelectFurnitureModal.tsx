import React from 'react';
import {S} from "./style";
import { SelectFurnitureModalProps } from '../../../type/type'
import useModal from '../../../hooks/useModal';
import Modal from "../../../components/Modal/Modal";


const SelectFurnitureModal: React.FC<SelectFurnitureModalProps> = ({ isOpen, onClose}) => {
      
    
    // 오늘의 가구를 선택하는 모달 상태관리
      const {
        isOpen: isSelectFurnitureModalOpen,
        openModal: openSelectFurnitureModal,
        closeModal: closeSelectFurnitureModal,
      } = useModal();

      React.useEffect(() => {
        openSelectFurnitureModal(); // 모달을 열어야 할 때마다 호출
    
      }, [openSelectFurnitureModal]); // isOpen을 의존성 배열에 추가

    return (
        <>
             <Modal
                modalTitle={'미션함'}
                isOpen={isSelectFurnitureModalOpen}
                onClose={onClose}
                imageType={'FurnitureSelectModal'}
            >

            </Modal>
        </>

  );
};

export default SelectFurnitureModal;