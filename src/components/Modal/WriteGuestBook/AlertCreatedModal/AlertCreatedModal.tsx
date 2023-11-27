import * as S from './style';
import Ornaments from '@/components/ImportOrnaments/ImportOrnaments';
import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';
import Modal from '../../Modal';
import {Contents} from '../WriteGuestBook';

type Props = {
  onClose: () => void;
  selectedOrnament: number;
  contents: Contents;
  setNextStep: () => void;
};

export default function AlertCreatedModal({
  onClose,
  selectedOrnament,
  contents,
  setNextStep,
}: Props) {
  return (
    <Modal
      modalTitle={'방명록'} // modalState에 따른 타이틀
      onClose={onClose}
      imageType={'MediumModal'} // modalState에 따른 이미지 타입
    >
      <ModalCloseButton onClick={onClose} />
      <S.ModalInnerWrapper>
        {Ornaments[selectedOrnament - 1] && (
          <S.OrnamentImg
            style={{
              backgroundImage: `url(${Ornaments[selectedOrnament - 1].image})`,
            }}
          />
        )}
        <S.AuthorName>{contents.author}</S.AuthorName>
        <S.ModalText>방명록을 남겼어요!</S.ModalText>
        <ModalOKButton buttonName="확인하기" onClick={setNextStep} />
      </S.ModalInnerWrapper>
    </Modal>
  );
}
