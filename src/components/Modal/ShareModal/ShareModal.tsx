import * as S from './style';
import React from 'react';
import ModalCloseButton from '../../ModalCloseButton/ModalCloseButton';
import Modal from '../Modal';
import {useLocation} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

const BASE_URL = 'https://www.cookiehouse.site';

function ShareModal({closeModal, isOpen}: Props) {
  const {pathname} = useLocation();
  const link = `${BASE_URL}${pathname}`;

  const handleCopy = (text: string, result: boolean) => {
    if (result) {
      alert('클립보드에 링크가 복사되었습니다.');
      return;
    }
    alert('복사에 실패하였습니다');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      modalTitle={'친구에게 공유하기'}
      imageType={'SmallModal'}
    >
      <S.Wrapper>
        <S.ShareLinkBg>
          <S.Link className="box">{link}</S.Link>
          <CopyToClipboard text={link} onCopy={handleCopy}>
            <S.ShareBtn>복사</S.ShareBtn>
          </CopyToClipboard>
        </S.ShareLinkBg>
      </S.Wrapper>
      <ModalCloseButton onClick={closeModal} />
    </Modal>
  );
}
export default React.memo(ShareModal);
