import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import {useCallback, useState} from 'react';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';
import Overlap from '../../../components/Overlap/Overlap';
import FurnitureLayer from '../../../assets/FurnitureLayer';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {getAllCompletedMissions} from '../../../apis/mission';
import {
  IAllCompletedMissions,
  ICompletedMission,
} from '../../../interfaces/mission';
import {coordinates} from '../../../coordinates/coordinates';
import CompletedMissionModal from '../../../components/Modal/CompletedMissionModal/CompletedMissionModal';
import Wallpapers from '@/assets/Wallpaper';
import {IHouseOutside} from '@/interfaces/house';
import {useLocation} from 'react-router-dom';
import LongButton from '@/components/Buttons/LongButton/LongButton';

const BASE_URL = 'https://cookiehouse.site';

export default function Inside() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] =
    useState<null | ICompletedMission>(null);
  const {isMyHouse, id} = useIsMyHouse();

  const queryClient = useQueryClient();
  const houseData = queryClient.getQueryData<IHouseOutside>([
    'house',
    'outside',
    id,
  ]);
  const {pathname} = useLocation();
  const handleShare = async () => {
    // setShareModalOpen(true);
    const link = `${BASE_URL}${pathname}`;
    if (navigator.share) {
      await navigator.share({
        title: '쿠키하우스',
        text: `쿠키하우스`,
        url: `https://cookiehouse.site/${id}`,
      });
    } else {
      // TODO : do something else like copying the data to the clipboard
      navigator.clipboard.writeText(link);
      alert('링크가 복사되었습니다.');
    }
  };

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

  const handleFurnitureClick = (mission: ICompletedMission) => {
    setMissionModalOpen(mission);
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
            onClick={() => handleFurnitureClick(v)}
          />
        ))}
      </S.Frame>
      {isMyHouse && (
        <LongButton
          width={237.5}
          height={50}
          margin="50px 0 0 0"
          onClick={handleShare}
        >
          <S.ButtonText>집들이 초대하기</S.ButtonText>
        </LongButton>
      )}

      {missionModalOpen !== null && (
        <CompletedMissionModal
          closeModal={closeMissionModal}
          isOpen={missionModalOpen !== null}
          date={missionModalOpen.missionCompleteDate}
          missionCompleteId={missionModalOpen.missionCompleteId}
        />
      )}
    </>
  );
}
