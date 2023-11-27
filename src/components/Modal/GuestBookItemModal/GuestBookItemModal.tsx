import * as S from './style';
import Ornaments from '@/components/ImportOrnaments/ImportOrnaments';
import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';
import Modal from '../Modal';
import {IGuestBookItem} from '@/interfaces/guestBook';

type Props = {
  onClose: () => void;
  item: IGuestBookItem;
};

export default function GuestBookItemModal({
  onClose,
  item: {ornamentId, author, content},
}: Props) {
  return (
    <Modal modalTitle={'방명록'} onClose={onClose} imageType={'MediumModal'}>
      <ModalCloseButton onClick={onClose} />
      <S.ModalInnerWrapper>
        <S.OrnamentImg
          style={{
            backgroundImage: `url(${Ornaments[ornamentId - 1].image})`,
          }}
        />
        <S.AuthorName>{author}</S.AuthorName>
        <S.GuestBookContent>{content}</S.GuestBookContent>
      </S.ModalInnerWrapper>
    </Modal>
  );
}
