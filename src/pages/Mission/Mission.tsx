import React, {useState, useEffect} from 'react';
import Modal from '../../components/Modal/Modal';
import useModal from '../../hooks/useModal';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import {S} from './style';
import useInput from '../../hooks/useInput';
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import Furnitures from '../../assets/Furniture';
import {useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {ICompletedMission} from '../../interfaces/mission';
import {
  fetchTodayMissionData,
  uploadImageMessageFurnitureId,
  getCompletedMissionByDate,
} from '../../apis/mission';
import {userInfoAtom} from '../../atoms/loginStateAtom';

function Mission({isOpen, onClose}) {
  const userInfo = useRecoilValue(userInfoAtom);
  const {todayMissionComplete} = userInfo; //이걸로 이미지와 메시지 post를 했냐 안했냐 판단

  // 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer>(''); // 업로드 된 이미지 url 관리하는 상태
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일을 관리하는 상태
  const [missionDate, setMissionDate] = useState<string>('');
  const [missionMessage, setMissionMessage] =
    useState<string>('오늘 먹은 점심');
  const [missionId, setMissionId] = useState<number>(1);
  const [modalStep, setModalStep] = useState(1);
  const [imageType, setImageType] = useState<
    'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'
  >('MediumModal');
  const [modalTitle, setModalTitle] = useState<string>('미션함');
  const [furnitureId, setFurnitureId] = useState(1);
  // ChangeButton을 보여줄지 말지 결정하는 상태 변수
  const [showChangeButton, setShowChangeButton] = useState(false);

  useEffect(() => {
    openMissionArriveModal(); // 모달을 열어야 할 때마다 호출
  }, [openMissionArriveModal]);

  // useEffect 내에서 fetchTodayMissionData 함수 사용
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodayMissionData();
      if (data) {
        setMissionDate(data.missionDate);
        setMissionMessage(data.missionMessage);
        setMissionId(data.missionId);
      }
    };

    fetchData();
  }, []);

  const {data} = useQuery<ICompletedMission>({
    queryKey: ['mission', missionDate],
    queryFn: () => getCompletedMissionByDate(missionDate),
    staleTime: 10000,
  });

  //TODO: post로 할지 put으로 할지에 대한 분기처리 필요.
  const handleUploadImageMessageFurnitureIdWrapper = async () => {
    try {
      await uploadImageMessageFurnitureId(
        imageFile,
        content.value,
        furnitureId,
        'post',
      );
      // 업로드 성공 후 처리
      setImageFile(null);
      content.reset();
      setImageType('LargeModal');
      setModalTitle(formatDate(missionDate));
      setModalStep(5);
    } catch (error) {
      // 업로드 실패 시 처리
      alert('업로드에 실패했어요.');
      setImageType('LargeModal'); //TODO: 배포 시에 없애야 함. 테스트용
      setModalTitle(formatDate(missionDate)); //TODO: 배포 시에 없애야 함. 테스트용
      setModalStep(5); //TODO: 배포 시에 없애야 함. 테스트용
    }
  };

  // 날짜 형식을 "MM월 dd일"로 포매팅하는 함수
  const formatDate = (missionDate) => {
    const [year, month, day] = missionDate.split('-');
    const formatedDate = `${month}월 ${day}일`;
    return formatedDate;
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
  const handleCheckExistImageMessage = async () => {
    if (!imageFile || !content.value.trim()) {
      alert('이미지와 메시지를 모두 입력해야 합니다.');
      //return; //TODO: 실제 환경에서 주석 해제하기
      setModalStep(3); //TODO: 실제 환경에서 제거하기
    } else {
      setModalStep(3);
    }
  };

  // 가구 고르기 버튼 클릭
  const handleFurnitureClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setFurnitureId(id); // 서버로 보낼 furnitureId
  };

  // ShowMoreMenuButton 클릭 핸들러
  const handleOpenShowMoreMenu = () => {
    setShowChangeButton(!showChangeButton); // 상태를 반전시킵니다.
  };

  useEffect(() => {
    if (todayMissionComplete) {
      setImageType('LargeModal');
    }
  }, [todayMissionComplete]);
  // 모달 내용을 결정하는 함수
  const renderModalContent = () => {
    // todayMissionComplete가 true일 때 case 5만 보여줌
    //TODO: 수정하기 기능 추가
    if (todayMissionComplete) {
      return (
        <>
          <S.ModalText2>{missionMessage}</S.ModalText2>
          <S.ShowMoreMenuButton />
          <S.ImageWrapper>
            <S.ImagePreview src={data?.missionCompleteImage} />
          </S.ImageWrapper>
          <S.TodayMessageLine />
          <S.ShowMessage>{data?.missionCompleteContent}</S.ShowMessage>
        </>
      );
    }
    switch (modalStep) {
      case 1:
        return (
          <>
            <S.SwappingEnvelope />
            <S.ModalText>미션이 도착했어요!</S.ModalText>
            <S.ModalOkButtonWrapper>
              <ModalOKButton
                buttonName="확인하기"
                onClick={() => {
                  setModalStep(2);
                  setImageType('LargeModal');
                  setModalTitle(formatDate(missionDate));
                }}
              />
            </S.ModalOkButtonWrapper>
          </>
        );
      case 2:
        return (
          <>
            <S.ModalText2>{missionMessage}</S.ModalText2>
            {/* 이미지 업로드 및 메시지 입력 폼 */}
            <S.ImageUploadLabel
              htmlFor="image-upload"
              onClick={(event) => event.stopPropagation()}
            >
              <S.ImageInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              {uploadedImage ? (
                <S.ImagePreview src={uploadedImage as string} />
              ) : (
                <></>
              )}
            </S.ImageUploadLabel>
            <S.MessageArea
              placeholder="메시지를 입력하세요."
              maxLength={200}
              value={content.value}
              onChange={content.handleChange}
            />
            <S.ModalOkButtonWrapper>
              <ModalOKButton
                buttonName="오늘의 가구"
                onClick={() => {
                  setImageType('MediumModal');
                  setModalTitle('오늘의 가구');
                  handleCheckExistImageMessage();
                }}
              />
            </S.ModalOkButtonWrapper>
          </>
        );
      case 3:
        return (
          <>
            <S.GuestBookEntryGrid>
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}1`]}
              />
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}2`]}
              />
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}3`]}
              />
            </S.GuestBookEntryGrid>
            <S.ModalOkButtonWrapper>
              <ModalOKButton
                buttonName="보러가기"
                onClick={() => {
                  setModalStep(4);
                  setImageType('FurnitureSelectModal');
                  setModalTitle('하나를 선택해주세요!');
                }}
              />
            </S.ModalOkButtonWrapper>
          </>
        );
      case 4:
        return (
          <>
            <S.DecorationButtonContainer>
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}1`]}
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => handleFurnitureClick((missionId - 1) * 3 + 1, event)}
                dark={furnitureId === (missionId - 1) * 3 + 1}
              />
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}2`]}
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => handleFurnitureClick((missionId - 1) * 3 + 2, event)}
                dark={furnitureId === (missionId - 1) * 3 + 2}
              />
              <DecorationButton
                size={90}
                image={Furnitures[`Furniture${missionId}3`]}
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => handleFurnitureClick((missionId - 1) * 3 + 3, event)}
                dark={furnitureId === (missionId - 1) * 3 + 3}
              />
            </S.DecorationButtonContainer>
            <S.ModalOkButtonWrapper>
              <ModalOKButton
                buttonName="다 골랐어요!"
                onClick={() => {
                  handleUploadImageMessageFurnitureIdWrapper();
                }}
              />
            </S.ModalOkButtonWrapper>
          </>
        );
      case 5:
        return (
          <>
            <S.TextAndButtonWrapper>
              <S.ModalText2>{missionMessage}</S.ModalText2>
              <S.ShowMoreMenuButton onClick={handleOpenShowMoreMenu} />
              {showChangeButton && (
                <S.ChangeButton>이미지/메시지 수정</S.ChangeButton>
              )}
            </S.TextAndButtonWrapper>

            <S.ImageWrapper>
              <S.ImagePreview src={data?.missionCompleteImage} />
            </S.ImageWrapper>
            <S.TodayMessageLine />
            <S.ShowMessage>{data?.missionCompleteContent}</S.ShowMessage>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        modalTitle={modalTitle}
        isOpen={isOpen}
        onClose={onClose}
        imageType={imageType}
      >
        <ModalCloseButton onClick={onClose} />
        <S.ModalInnerWrapper>{renderModalContent()}</S.ModalInnerWrapper>
      </Modal>
    </>
  );
}
export default Mission;
