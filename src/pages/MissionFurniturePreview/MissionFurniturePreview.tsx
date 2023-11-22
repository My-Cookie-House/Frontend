import {S} from './style';
import Button from '../../components/Buttons/Button';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {useCallback, useEffect, useState} from 'react';
import Overlap from '../../components/Overlap/Overlap';
import {useSuspenseQuery} from '@tanstack/react-query';
import {
  fetchTodayMissionData,
  getAllCompletedMissions,
  uploadImageMessageFurnitureId,
} from '../../apis/mission';
import {IAllCompletedMissions} from '../../interfaces/mission';
import FurnitureLayer from '../../assets/FurnitureLayer';
import {useRecoilState} from 'recoil';
import {
  missionIdAtom,
  furnitureNumAtom,
  furnitureButtonClickedAtom,
} from '../../atoms/missionAtomState'; // atoms 파일 경로에 따라 수정
import Modal from '../../components/Modal/Modal';
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import Furnitures from '../../assets/Furniture';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import {Navigate, useNavigate} from 'react-router';
import {missionStateAtom} from '../../atoms/missionState';
import InsideBg from '@/assets/House/Inside/InsideBg.png';

export default function MissionFurniturePreview() {
  // 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const {isMyHouse, id} = useIsMyHouse();
  const handleShare = () => setShareModalOpen(true);
  const [selectedFurnitureImage, setSelectedFurnitureImage] = useState(null);
  const [furnitureNum, setFurnitureNum] = useRecoilState(furnitureNumAtom);
  const [imageType, setImageType] = useState<
    'SmallModal' | 'MediumModal' | 'LargeModal' | 'FurnitureSelectModal'
  >('FurnitureSelectModal');
  const [modalTitle, setModalTitle] = useState<string>('하나를 선택해주세요!');
  const [missionId, setMissionId] = useRecoilState(missionIdAtom);
  const [furnitureButtonClicked, setFurnitureButtonClicked] = useRecoilState(
    furnitureButtonClickedAtom,
  );
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일을 관리하는 상태
  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태
  const [missionDate, setMissionDate] = useState<string>('');
  const [missionMessage, setMissionMessage] =
    useState<string>('오늘 먹은 점심');
  const [modalStep, setModalStep] = useState(1);
  const navigate = useNavigate();
  const handleFurnitureSelected = () => {
    const furnitureImage =
      FurnitureLayer[`FurnitureLayer${missionId}${furnitureNum}`];
    setSelectedFurnitureImage(furnitureImage);
  };
  const [missionState, setMissionState] = useRecoilState(missionStateAtom);

  useEffect(() => {
    handleFurnitureSelected();
  });

  useEffect(() => {
    openMissionArriveModal();
  });

  const {data} = useSuspenseQuery<IAllCompletedMissions>({
    queryKey: ['house', 'inside', id],
    queryFn: () => getAllCompletedMissions(id),
  });

  // 가구 고르기 버튼 클릭
  const handleFurnitureClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    furnitureNum: number, // 해당 미션에서 가구의 순서를 나타내는 번호
  ) => {
    event.preventDefault();
    // missionId와 furnitureNum 값을 Recoil atoms에 설정
    setFurnitureNum(furnitureNum);
    setMissionState((prev) => ({
      ...prev,
      missionCompleteFurnitureId: +`${missionId}${furnitureNum}`,
    }));
  };

  // 날짜 형식을 "MM월 dd일"로 포매팅하는 함수
  const formatDate = (missionDate) => {
    const [year, month, day] = missionDate.split('-');
    const formatedDate = `${month}월 ${day}일`;
    return formatedDate;
  };

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

  //TODO: post로 할지 put으로 할지에 대한 분기처리 필요.
  const handleUploadImageMessageFurnitureIdWrapper = async () => {
    try {
      await uploadImageMessageFurnitureId(
        missionState.missionCompleteImage,
        missionState.missionCompleteContent,
        missionState.missionCompleteFurnitureId,
        'post',
      );
      // 업로드 성공 후 처리
      setImageFile(null);
      content.reset();
      navigate(`/${id}/inside`);
    } catch (error) {
      // 업로드 실패 시 처리
      alert('업로드에 실패했어요.');
    }
  };

  return (
    <>
      <S.FurnitureLayerWrapper>
        <Overlap
          width={355}
          height={533}
          margin="23px 0 0 0"
          imgs={[InsideBg, selectedFurnitureImage && selectedFurnitureImage]}
        />
      </S.FurnitureLayerWrapper>

      <Modal
        modalTitle={modalTitle}
        isOpen={isMissionArriveModalOpen}
        onClose={closeMissionArriveModal}
        imageType={imageType}
      >
        <ModalCloseButton onClick={closeMissionArriveModal} />
        <S.ModalInnerWrapper>
          <S.DecorationButtonContainer>
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}1`]}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              ) => handleFurnitureClick(event, 1)}
              dark={furnitureNum === 1}
            />
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}2`]}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              ) => handleFurnitureClick(event, 2)}
              dark={furnitureNum === 2}
            />
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}3`]}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
              ) => handleFurnitureClick(event, 3)}
              dark={furnitureNum === 3}
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
        </S.ModalInnerWrapper>
      </Modal>
    </>
  );
}
