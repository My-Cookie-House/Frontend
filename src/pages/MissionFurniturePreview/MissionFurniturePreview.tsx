import {S} from './style';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {useEffect, useState} from 'react';
import Overlap from '../../components/Overlap/Overlap';
import {useQueryClient} from '@tanstack/react-query';
import {uploadImageMessageFurnitureId} from '../../apis/mission';
import FurnitureLayer from '../../assets/FurnitureLayer';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {missionIdAtom, furnitureNumAtom} from '../../atoms/missionAtomState'; // atoms 파일 경로에 따라 수정
import Modal from '../../components/Modal/Modal';
import DecorationButton from '../../components/Buttons/DecorationButton/DecorationButton';
import Furnitures from '../../assets/Furniture';
import ModalOKButton from '../../components/ModalOKButton/ModalOKButton';
import useModal from '../../hooks/useModal';
import ModalCloseButton from '../../components/ModalCloseButton/ModalCloseButton';
import {useNavigate} from 'react-router';
import {missionStateAtom} from '../../atoms/missionState';
import Wallpapers from '@/assets/Wallpaper';
import {useAllCompletedMissions} from '@/hooks/useAllCompletedMissions';
import useTodayMission from '@/hooks/useTodayMission';
import {userInfoAtom} from '@/atoms/loginStateAtom';

export default function MissionFurniturePreview() {
  // 모달 상태관리
  const {
    isOpen: isMissionArriveModalOpen,
    openModal: openMissionArriveModal,
    closeModal: closeMissionArriveModal,
  } = useModal();

  const setUserInfo = useSetRecoilState(userInfoAtom);
  const {id, userId} = useIsMyHouse();
  const [selectedFurnitureImage, setSelectedFurnitureImage] = useState(null);
  const [furnitureNum, setFurnitureNum] = useRecoilState(furnitureNumAtom);
  const [modalTitle, setModalTitle] = useState<string>('하나를 선택해주세요!');

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
  const {missionId} = useTodayMission(userId);
  const {furnitureImgs, wallpaperId} = useAllCompletedMissions(userId);

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

  const queryClient = useQueryClient();

  //TODO: post로 할지 put으로 할지에 대한 분기처리 필요.
  const handleUploadImageMessageFurnitureIdWrapper = async () => {
    try {
      // 가구를 선택하지 않은 경우
      if (missionState.missionCompleteFurnitureId === 0) {
        throw new Error();
      }

      await uploadImageMessageFurnitureId(
        missionState.missionCompleteImage,
        missionState.missionCompleteContent,
        missionState.missionCompleteFurnitureId,
        'post',
      );

      await queryClient.invalidateQueries({
        queryKey: ['mission', 'today', userId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['loginState'],
      });
      setUserInfo((prev) => ({...prev, todayMissionComplete: true}));
      navigate(`/${userId}/inside`);
    } catch (error) {
      if (
        (error.response.data.message = '지원하지 않는 이미지 파일 형식입니다')
      ) {
        alert('지원하지 않는 이미지 파일 형식입니다');
      } else {
        alert('업로드에 실패했어요.');
      }
    }
  };

  return (
    <>
      <S.FurnitureLayerWrapper>
        <Overlap
          width={355}
          height={533}
          margin="23px 0 0 0"
          imgs={[
            Wallpapers[`Wallpaper${wallpaperId}`],
            ...furnitureImgs,
            selectedFurnitureImage && selectedFurnitureImage,
          ]}
        />
      </S.FurnitureLayerWrapper>
      <Modal
        modalTitle={modalTitle}
        isOpen={isMissionArriveModalOpen}
        onClose={closeMissionArriveModal}
        imageType={'FurnitureSelectModal'}
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
              onClick={handleUploadImageMessageFurnitureIdWrapper}
            />
          </S.ModalOkButtonWrapper>
        </S.ModalInnerWrapper>
      </Modal>
    </>
  );
}
