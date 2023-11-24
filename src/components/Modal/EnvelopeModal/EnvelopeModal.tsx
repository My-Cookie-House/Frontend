import {ModalSize} from '@/components/Mission/Mission';
import Modal from '../Modal';
import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';
import * as SMission from '../style';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';
import * as S from './style';

type Props = {
  closeMission: () => void;
  isOpen: boolean;
  setNextStep: () => void;
};

export default function EnvelopeModal({closeMission, isOpen, setNextStep}) {
  return (
    <Modal
      modalTitle={'미션함'}
      isOpen={isOpen}
      onClose={closeMission}
      imageType={'MediumModal'}
    >
      <ModalCloseButton onClick={closeMission} />
      <SMission.ModalInnerWrapper>
        <S.SwappingEnvelope />
        <S.ModalText>미션이 도착했어요!</S.ModalText>
        <S.ModalOkButtonWrapper>
          <ModalOKButton buttonName="확인하기" onClick={setNextStep} />
        </S.ModalOkButtonWrapper>
      </SMission.ModalInnerWrapper>
    </Modal>
  );
}
