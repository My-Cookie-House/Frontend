import * as S from './style';
import Modal from '../Modal';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import GingerMan from '@/assets/Cookies/GingerMan.svg';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

export default function GoOutModal({isOpen, closeModal}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      imageType={'MediumModal'}
      modalTitle={'외출하기'}
    >
      <ModalCloseButton onClick={closeModal} />

      <S.Wrapper>
        <S.ModalText>{'외출하기를 누르시면'}</S.ModalText>
        <S.ModalText>{'로그아웃이 됩니다.'}</S.ModalText>
        <S.ModalText>{'로그아웃 하시겠습니까?'}</S.ModalText>
        <S.GingerManImg src={GingerMan} />
        <S.YesNoBtnWrapper>
          <S.YesNoBtn>예</S.YesNoBtn>
          <S.YesNoBtn onClick={closeModal}>아니요</S.YesNoBtn>
        </S.YesNoBtnWrapper>
      </S.Wrapper>
    </Modal>
  );
}
