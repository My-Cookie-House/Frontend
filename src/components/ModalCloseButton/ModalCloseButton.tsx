import {S} from './style';
import {ModalButtonProps} from '../../type/type';

function ModalCloseButton({onClick}: ModalButtonProps) {
  return (
    <>
      <S.ModalCloseButton onClick={onClick} />
    </>
  );
}

export default ModalCloseButton;
