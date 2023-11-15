import React, { useState } from 'react';
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ModalCloseButton from "../../components/ModalCloseButton/ModalCloseButton";
import ModalOKButton from "../../components/ModalOKButton/ModalOKButton";
import { S } from "./style"
import useInput from '../../hooks/useInput';

function Mission({ isOpen, onClose }) {
  // 미션이 도착했어요! 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

    // 사진과 메시지를 올리는 모달 상태관리
    const {
      isOpen: isUploadImageMessageModal,
      openModal: openUploadImageMessageModal,
      closeModal: closeUploadImageMessageModal,
    } = useModal();

    const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
    const [uploadedImage, setUploadedImage] = useState(''); // 업로드 된 이미지 url 관리하는 상태


  React.useEffect(() => {
    openMissionArriveModal(); // 컴포넌트 마운트 시 모달을 열기
  }, [openMissionArriveModal]);

  //이미지, 메세지 입력완료 함수
  const handleSwitchToUploadImageMessageModal = () => {

  }

  //이미지, 메세지 입력완료 함수
  const handleUploadImageMessage = () => {
    closeMissionArriveModal();
    openUploadImageMessageModal();
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  


  
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
            onClick={handleUploadImageMessage}
          />
        </S.ModalInnerWrapper>
      </Modal>

      {/* 사진과 메시지를 올리는 모달 */}
      <Modal
        modalTitle={'여기에 서버에서 받은 날짜'}
        isOpen={isUploadImageMessageModal}
        onClose={closeUploadImageMessageModal}
        imageType={'LargeModal'}
      >
        <S.ModalText>여기에 서버에서 받은 미션</S.ModalText>
        <ModalCloseButton onClick={closeUploadImageMessageModal} />
        <S.Form>
          {uploadedImage ? (
            <S.ImagePreview style={{ backgroundImage: `url(${uploadedImage})` }} />
          ) : (
            <>
              <S.ImageUploadLabel htmlFor="image-upload">
                <S.ImageUploadButton></S.ImageUploadButton>
              </S.ImageUploadLabel>
              <S.HiddenFileInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </>
          )}
          <S.MessageArea 
              placeholder="메시지를 입력하세요."
              maxLength={200}
              value={content.value}
              onChange={content.handleChange}
          />
          <S.CheckTextLength>{content.value.length}/500자</S.CheckTextLength>          
          <ModalOKButton buttonName="입력완료" onClick={handleUploadImageMessage} />
        </S.Form>
      </Modal>
    </>
  )
}
export default Mission;