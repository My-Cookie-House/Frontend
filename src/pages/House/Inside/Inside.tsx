import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import {useCallback, useState} from 'react';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';
import Overlap from '../../../components/Overlap/Overlap';
import {useSuspenseQuery} from '@tanstack/react-query';
import mission from '../../../apis/mission';
import {IAllCompletedMissions} from '../../../interfaces/mission';

export default function Inside() {
  const [modalOpen, setModalOpen] = useState(false);
  const {isMyHouse, id} = useIsMyHouse();
  const handleShare = () => setModalOpen(true);

  const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);

  const {data} = useSuspenseQuery<IAllCompletedMissions>({
    queryKey: ['house', 'inside', id],
    queryFn: () => mission.getAllCompletedMissions(id),
  });
  const furnitures = data.completedMissions.map(
    (mission) => mission.missionCompleteFurniture,
  );

  const handleFurnitureClick = () => {};

  return (
    <>
      <Overlap width={300} height={400} margin="40px 0 0 0" imgs={[]} />
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
      <ShareModal closeModal={closeModal} isOpen={modalOpen} />
    </>
  );
}
