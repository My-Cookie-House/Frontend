import * as S from './style';
import React from 'react';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import Modal from '../Modal';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

function ShareModal({closeModal, isOpen}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      modalTitle={'친구에게 공유하기'}
      imageType={'SmallModal'}
    >
      <S.Wrapper>
        <S.ShareLinkBg>
          <S.ShareBtn></S.ShareBtn>
        </S.ShareLinkBg>
      </S.Wrapper>
      <ModalCloseButton onClick={closeModal} />
    </Modal>
  );
}
export default React.memo(ShareModal);
