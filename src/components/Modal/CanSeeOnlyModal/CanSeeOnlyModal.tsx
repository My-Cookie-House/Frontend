import * as S from './style';
import Modal from '../Modal';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import GingerMan from '@/assets/Cookies/GingerMan.svg';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

export default function CanSeeOnlyModal({
  isOpen,
  closeModal,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      imageType={'MediumModal'}
      modalTitle={"주의"}
    >
      <ModalCloseButton onClick={closeModal} />

      <S.Wrapper>
        <S.GingerManImg src={GingerMan} />
        <S.ModalText>{"방명록의 내용은 집주인만 \n 확인할 수 있어요!"}</S.ModalText>
          <S.YesNoBtn onClick={closeModal}>{"알겠어요."}</S.YesNoBtn>
      </S.Wrapper>
    </Modal>
  );
}
