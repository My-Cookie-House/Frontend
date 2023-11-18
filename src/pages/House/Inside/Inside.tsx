import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import {useCallback, useState} from 'react';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';
import Overlap from '../../../components/Overlap/Overlap';
import InsideBg from '../../../assets/House/Inside/InsideBg.png';
import FurnitureLayer from '../../../assets/FurnitureLayer';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getAllCompletedMissions} from '../../../apis/mission';
import {IAllCompletedMissions} from '../../../interfaces/mission';
import {dates} from '../../../coordinates/coordinates';
import CompletedMissionModal from '../../../components/Modal/CompletedMissionModal/CompletedMissionModal';

export default function Inside() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState<null | string>(null);
  const {isMyHouse, id} = useIsMyHouse();
  const handleShare = () => setShareModalOpen(true);
  const [selectedFurnitureImage, setSelectedFurnitureImage] = useState(null);

  const closeShareModal = useCallback(
    () => setShareModalOpen(false),
    [setShareModalOpen],
  );
  const closeMissionModal = useCallback(
    () => setMissionModalOpen(null),
    [setMissionModalOpen],
  );
  const {data} = useSuspenseQuery<IAllCompletedMissions>({
    queryKey: ['house', 'inside', id],
    queryFn: () => getAllCompletedMissions(id),
  });

  const furnitures = data?.completedMissions?.map(
    (mission) => mission.missionCompleteFurniture,
  );
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
  const handleFurnitureClick = (date: string) => {
    setMissionModalOpen(date);
  };

  return (
    <>
      <S.Frame>
        <Overlap
          width={300}
          height={400}
          margin="40px 0 0 0"
          imgs={[InsideBg, FurnitureLayer['FurnitureLayer11']]}
        />
        {Array(1)
          .fill({
            missionCompleteId: 1,
            missionCompleteImage: 'https://~',
            missionCompleteContent: '오늘은 어쩌구~',
            missionCompleteDate: '2023-12-20',
            missionCompleteFurnitureId: 1,
          })
          .map((v: any) => (
            <S.ButtonLayer
              {...dates.get(v.missionCompleteDate)}
              onClick={() => handleFurnitureClick(v.missionCompleteDate)}
            />
          ))}
      </S.Frame>
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
      {missionModalOpen !== null && (
        <CompletedMissionModal
          closeModal={closeMissionModal}
          isOpen={missionModalOpen !== null}
          date={missionModalOpen}
        />
      )}
    </>
  );
}
