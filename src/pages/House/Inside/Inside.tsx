import * as S from './style';
import Share from '../../../assets/Button/Share.svg';
import ShareIcon from '../../../assets/Icons/ShareIcon.svg';
import Button from '../../../components/Buttons/Button';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import Modal from '../../../components/Modal/Modal';
import {useCallback, useState} from 'react';
import BackButton from '../../../components/BackButton/BackButton';
import ModalCloseButton from '../../../components/ModalCloseButton/ModalCloseButton';
import ShareModal from '../../../components/Modal/ShareModal/ShareModal';

export default function Inside() {
  const [modalOpen, setModalOpen] = useState(false);
  const {isMyHouse} = useIsMyHouse();
  const handleShare = () => setModalOpen(true);

  const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);

  return (
    <>
      <img
        alt="쿠키하우스 내부"
        src=""
        style={{
          width: '295px',
          height: '364px',
          border: '1px solid black',
          marginTop: '43px',
        }}
      />
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
