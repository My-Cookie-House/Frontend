import * as S from './style';
import Modal from '../Modal';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import GingerMan from '@/assets/Cookies/GingerMan.svg';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  modalTitle: string;
  modalTexts: string[];
  yesBtnText: string;
  onYes: () => void;
};

export default function CustomModal({
  isOpen,
  closeModal,
  modalTitle,
  modalTexts,
  yesBtnText,
  onYes,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      imageType={'MediumModal'}
      modalTitle={modalTitle}
    >
      <ModalCloseButton onClick={closeModal} />

      <S.Wrapper>
        {modalTexts.map((text, index) => (
          <S.ModalText key={index}>{text}</S.ModalText>
        ))}
        <S.GingerManImg src={GingerMan} />
        <S.YesNoBtnWrapper>
          <S.YesNoBtn onClick={onYes}>{yesBtnText}</S.YesNoBtn>
          <S.YesNoBtn onClick={closeModal}>아니요</S.YesNoBtn>
        </S.YesNoBtnWrapper>
      </S.Wrapper>
    </Modal>
  );
}
