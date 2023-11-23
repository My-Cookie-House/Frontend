import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import {useCallback, useState} from 'react';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';
import Overlap from '../../../components/Overlap/Overlap';
import FurnitureLayer from '../../../assets/FurnitureLayer';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getAllCompletedMissions} from '../../../apis/mission';
import {
  IAllCompletedMissions,
  ICompletedMission,
} from '../../../interfaces/mission';
import {coordinates} from '../../../coordinates/coordinates';
import CompletedMissionModal from '../../../components/Modal/CompletedMissionModal/CompletedMissionModal';
import InsideBg from '@/assets/House/Inside/InsideBg.png';
import Wallpapers from '@/assets/Wallpaper';

// const getFurnitureNum = (furnitureId: number) => {
//   return furnitureId - 3 * (missionId - 1);
// };

export default function Inside() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState<null | string>(null);
  const {isMyHouse, id} = useIsMyHouse();
  const handleShare = () => setShareModalOpen(true);

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
    queryFn: () => getAllCompletedMissions(+id),
  });

  // 가구 레이어 이미지를 가져오는 string형식으로 리턴
  const furnitures = data?.completedMissions?.map(
    (mission) =>
      FurnitureLayer[`FurnitureLayer${mission.missionCompleteFurnitureId}`],
  );

  const getMissionIdFromFurnitureid = (furnitureId: number) => {
    const stringId = `${furnitureId}`;
    if (stringId.length === 2) {
      // missionId가 한 자리 수인 경우
      return +stringId.slice(0, 1);
    }
    // missionId가 두 자리 수인 경우
    return +stringId.slice(0, 2);
  };

  const handleFurnitureClick = (date: string) => {
    setMissionModalOpen(date);
  };

  return (
    <>
      <S.Frame>
        <Overlap
          width={355}
          height={533}
          margin="40px 0 0 0"
          imgs={[
            data && Wallpapers[`Wallpaper${data.wallpaperId}`],
            ...furnitures,
          ]}
        />
        {data?.completedMissions?.map((v: ICompletedMission) => (
          <S.ButtonLayer
            key={v.missionCompleteId}
            {...coordinates.get(
              getMissionIdFromFurnitureid(v.missionCompleteFurnitureId),
            )}
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
