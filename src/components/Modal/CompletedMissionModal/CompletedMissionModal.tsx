import * as S from './style';
import Modal from '../Modal';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import {useQuery} from '@tanstack/react-query';
import {getCompletedMissionByDate} from '../../../apis/mission';
import {ICompletedMission} from '../../../interfaces/mission';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  date: string;
};

export default function CompletedMissionModal({
  isOpen,
  closeModal,
  date,
}: Props) {
  const {data} = useQuery<ICompletedMission>({
    queryKey: ['mission', date],
    queryFn: () => getCompletedMissionByDate(date),
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
      <S.ModalText>{data?.missionCompleteContent}</S.ModalText>
      <S.Wrapper>
        <S.ImgBox src="" />
        <S.Label>오늘의 메시지</S.Label>
        <S.Line />
        <S.MessageArea>{data?.missionCompleteContent}</S.MessageArea>
      </S.Wrapper>
    </Modal>
  );
}
