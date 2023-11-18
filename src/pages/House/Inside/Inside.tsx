import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import {useCallback, useState} from 'react';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';
import Overlap from '../../../components/Overlap/Overlap';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getAllCompletedMissions} from '../../../apis/mission';
import {IAllCompletedMissions} from '../../../interfaces/mission';
import CompletedMissionModal from '../../../components/Modal/CompletedMissionModal/CompletedMissionModal';
import FurnitureLayer from '../../../assets/FurnitureLayer';
import Mission from '../../Mission/Mission';

export default function Inside() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const {isMyHouse, id} = useIsMyHouse();
  const handleShare = () => setShareModalOpen(true);
  const [selectedFurnitureImage, setSelectedFurnitureImage] = useState(null);

  const handleFurnitureSelected = (furnitureNum, missionId) => {
    const furnitureImage = FurnitureLayer[`FurnitureLayer${missionId}${furnitureNum}`];
    setSelectedFurnitureImage(furnitureImage);
};

  const closeShareModal = useCallback(
    () => setShareModalOpen(false),
    [setShareModalOpen],
  );
  const closeMissionModal = useCallback(
    () => setMissionModalOpen(false),
    [setMissionModalOpen],
  );
/**
  const {data} = useSuspenseQuery<IAllCompletedMissions>({
    queryKey: ['house', 'inside', id],
    queryFn: () => getAllCompletedMissions(id),
  });

  /**
   * TODO: furnitures 배열로 부터 가구들의 이미지를 가져와서 imgs 배열에 넣어주기!
  
  const furnitures = data?.completedMissions?.map(
    (mission) => mission.missionCompleteFurniture,
  );
*/
  /**
   * TODO: 가구 레이어 받으면, 아래 함수를 연결해 준다
   * 만약 본인 쿠키하우스가 아니면, 가구를 클릭 못하게???
   */
  const handleFurnitureClick = () => {
    setMissionModalOpen(true);
  };

  return (
    <>
      <Mission onFurnitureSelected={handleFurnitureSelected} isOpen={undefined} onClose={undefined} />

      <Overlap width={300} height={400} margin="40px 0 0 0" imgs={[selectedFurnitureImage]} />
      {isMyHouse && (
        <Button
          width={50}
          height={50}
          background={Share}
          margin="50px 0 0 0"
          onClick={handleShare}
        >
          <S.ShareImg src={ShareIcon} />
        </Button>
      )}

      {/* 공유하기 모달 */}
      <ShareModal closeModal={closeShareModal} isOpen={shareModalOpen} />
      {/* 미션 조회 모달 */}
      {/* <CompletedMissionModal
        closeModal={closeMissionModal}
        isOpen={missionModalOpen}
        date={'2023-12-25'} // TODO: 실제 가구에 해당하는 미션 날짜를 담아줘야함
      /> */}
    </>
  );
}