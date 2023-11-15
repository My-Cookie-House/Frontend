import React, { useState, useEffect } from 'react';
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import ModalCloseButton from "../../components/ModalCloseButton/ModalCloseButton";
import ModalOKButton from "../../components/ModalOKButton/ModalOKButton";
import { S } from "./style"
import useInput from '../../hooks/useInput';
import axios, { AxiosError } from 'axios';

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
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer>(''); // 업로드 된 이미지 url 관리하는 상태
    const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일을 관리하는 상태
    const [missionDate, setMissionDate] = useState<string>("2020-12-20");
    const [missionMessage, setMissionMessage] = useState<string>("오늘 먹은 점심");
    const [furnitureData, setFurnitureData] = useState([]);

    // 컴포넌트가 마운트되면 서버로부터 데이터를 가져옵니다.
    const fetchData = async () => {
      try {
          const response = await axios.get('서버의 엔드포인트 URL');
          if (response.status === 200 && response.data) {
            // 데이터를 상태에 저장합니다.
            setMissionDate(response.data.data.missionDate);
            setMissionMessage(response.data.data.missionMessage)
            setFurnitureData(response.data.data.todayFurnitures);
          }
        } catch (error) {
          console.error('데이터를 가져오는데 실패했습니다.', error);
          // 적절한 에러 처리를 수행합니다.
        }
      }

      useEffect(() => {
        fetchData();
      }, []); // 의존성 배열 추가

  React.useEffect(() => {
    openMissionArriveModal(); // 컴포넌트 마운트 시 모달을 열기
  }, [openMissionArriveModal]);

  // 날짜 형식을 "MM월 dd일"로 포매팅하는 함수
  const formatDate = (missionDate) => {
    const [year, month, day] = missionDate.split('-');
    const formatedDate = `${month}월 ${day}일`
    return formatedDate
  };

  // 이미지 업로드 핸들링
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 이미지 객체를 생성하여 크기 확인
        const img = new Image();
        img.onload = () => {
          setUploadedImage(reader.result as string); // 타입 단언을 사용하여 string으로 설정
        };
        img.src = reader.result as string; // 여기도 타입 단언을 사용하여 string으로 설정
      };
      reader.readAsDataURL(file);
      setImageFile(file); // 나중에 업로드할 이미지 파일을 상태에 저장
    }
  };
  

  // 이미지와 메시지를 서버에 업로드하는 함수
  const handleUploadImageMessage = async () => {
    if (!imageFile || !content.value.trim()) {
      alert('이미지와 메시지를 모두 입력해야 합니다.');
      //return; //TODO: 실제 환경에서 주석 해제하기
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('image', imageFile); // input의 name과 서버에서 요구하는 키를 맞추어야 함
    formData.append('message', content.value);

    try {
      await axios.post('~/mission-complete', formData, { //TODO: 엔드포인트 넣어야함
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': '' //TODO: 엑세스 토큰 여기에 넣어야함
        },
      });
        alert('업로드에 성공했습니다.');
        // 모달 닫기, 상태 초기화 등의 추가 작업
        setImageFile(null); // 이미지 파일 상태 초기화
        content.reset(); // 메시지 입력 상태 초기화
        closeUploadImageMessageModal();
    } catch (error: unknown) {
      //에러 일 경우
      if (error instanceof AxiosError) {
        alert('업로드에 실패했어요.');
      }
      return null;
    }
  };

  const handleMissionCheck = () => {
    closeMissionArriveModal();
    openUploadImageMessageModal();
  }
  
  


  
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
            onClick={handleMissionCheck}
          />
        </S.ModalInnerWrapper>
      </Modal>

      {/* 사진과 메시지를 올리는 모달 */}
      <Modal
        modalTitle={formatDate(missionDate)}
        isOpen={isUploadImageMessageModal}
        onClose={closeUploadImageMessageModal}
        imageType={'LargeModal'}
      >
        <S.ModalText>{missionMessage}</S.ModalText>
        <ModalCloseButton onClick={closeUploadImageMessageModal} />
        <S.Form>
          
              <S.ImageUploadLabel htmlFor="image-upload" onClick={(event) => event.stopPropagation()}>

                <S.ImageInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                onClick={(event) => event.stopPropagation()} // 이벤트 버블링 방지
                >
                </S.ImageInput>
                {uploadedImage ? (
                <S.ImagePreview
                src={uploadedImage as string}
                />
                ) : (
                  <>
                  </>
                )}
              </S.ImageUploadLabel>
              
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