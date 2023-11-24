import * as S from './style';
import Modal from '../Modal';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import {useQuery} from '@tanstack/react-query';
import {getCompletedMissionById} from '../../../apis/mission';
import {ICompletedMission} from '../../../interfaces/mission';
import useIsMyHouse from '../../../hooks/useIsMyHouse';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  date: string;
  missionCompleteId: number;
};

export default function CompletedMissionModal({
  isOpen,
  closeModal,
  date,
  missionCompleteId,
}: Props) {
  const {id} = useIsMyHouse();
  const {data} = useQuery<ICompletedMission>({
    queryKey: ['mission', missionCompleteId, id],
    queryFn: () => getCompletedMissionById(missionCompleteId),
    staleTime: 10000,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      imageType={'LargeModal'}
      modalTitle={date}
    >
      <ModalCloseButton onClick={closeModal} />
      <S.ModalText>{data?.missionMessage}</S.ModalText>
      <S.Wrapper>
        <S.ImgBox>
          <S.Img src={data?.missionCompleteImage} />
        </S.ImgBox>

        <S.Label>오늘의 메시지</S.Label>
        <S.Line />
        <S.MessageArea>{data?.missionCompleteContent}</S.MessageArea>
      </S.Wrapper>
    </Modal>
  );
}
