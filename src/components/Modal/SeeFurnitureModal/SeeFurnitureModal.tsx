import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';
import Modal from '../Modal';
import {MissionModalProps} from '@/components/Mission/Mission';
import * as SMission from '../style';
import * as S from './style';
import DecorationButton from '@/components/Buttons/DecorationButton/DecorationButton';
import Furnitures from '@/assets/Furniture';
import useTodayMission from '@/hooks/useTodayMission';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '@/atoms/loginStateAtom';
import {useNavigate} from 'react-router-dom';

export default function SeeFurnitureModal({
  closeMission,
  isOpen,
}: Omit<MissionModalProps, 'setNextStep'>) {
  const navigate = useNavigate();

  const {userId} = useRecoilValue(userInfoAtom);
  const {missionId} = useTodayMission(userId);

  const handleNextClick = () => {
    navigate(`custom/furniture`);
    closeMission();
  };

  return (
    <Modal
      modalTitle={'오늘의 가구'}
      isOpen={isOpen}
      onClose={closeMission}
      imageType={'MediumModal'}
    >
      <ModalCloseButton onClick={closeMission} />
      <SMission.ModalInnerWrapper>
        <S.Row>
          <DecorationButton
            size={90}
            image={Furnitures[`Furniture${missionId}1`]}
          />
          <DecorationButton
            size={90}
            image={Furnitures[`Furniture${missionId}2`]}
          />
        </S.Row>
        <S.Row2>
          <DecorationButton
            size={90}
            image={Furnitures[`Furniture${missionId}3`]}
          />
        </S.Row2>
        <S.ModalOkButtonWrapper>
          <ModalOKButton buttonName="보러가기" onClick={handleNextClick} />
        </S.ModalOkButtonWrapper>
      </SMission.ModalInnerWrapper>
    </Modal>
  );
}
