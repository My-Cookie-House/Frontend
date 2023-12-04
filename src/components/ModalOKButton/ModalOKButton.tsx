// ModalOKButton 컴포넌트
import {S} from './style';
import {ModalOKButtonProps, ModalButtonProps} from '../../type/type';

interface CombinedProps extends ModalOKButtonProps, ModalButtonProps {}

function ModalOKButton({buttonName, onClick, disabled = false}: CombinedProps) {
  return (
    <>
      <S.ModalOKButton type="submit" onClick={onClick} disabled={disabled}>
        {buttonName}
      </S.ModalOKButton>
    </>
  );
}

export default ModalOKButton;
