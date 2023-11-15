import React from 'react';
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ModalCloseButton from "../../components/ModalCloseButton/ModalCloseButton";
import ModalOKButton from "../../components/ModalOKButton/ModalOKButton";
import { S } from "./style"
function Mission({ isOpen, onClose }) {
  // 미션이 도착했어요! 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

  React.useEffect(() => {
    openMissionArriveModal(); // 컴포넌트 마운트 시 모달을 열기
  }, [openMissionArriveModal]);
  
  return (
    <>

      {/* 방명록 남겼다고 알림 모달 */}
      <Modal
        modalTitle={'방명록'}
        isOpen={isOpen}
        onClose={onClose}
        imageType={'MediumModal'}
      >
        <ModalCloseButton onClick={onClose} />
        <S.ModalInnerWrapper>
          <S.SwappingEnvelope />
          <S.ModalText>미션이 도착했어요!</S.ModalText>
          <ModalOKButton
            buttonName="확인하기"
            onClick={closeMissionArriveModal}
          />
        </S.ModalInnerWrapper>
      </Modal>
    </>
  )
}
export default Mission;