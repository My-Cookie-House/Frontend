import {MissionModalProps} from '@/components/Mission/Mission';
import Modal from '../Modal';
import ModalOKButton from '@/components/ModalOKButton/ModalOKButton';
import * as S from './style';
import * as SMission from '../style';
import useTodayMission from '@/hooks/useTodayMission';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userInfoAtom} from '@/atoms/loginStateAtom';
import {useEffect, useState} from 'react';
import useInput from '@/hooks/useInput';
import {missionStateAtom} from '@/atoms/missionState';
import ModalCloseButton from '@/components/ModalCloseButton/ModalCloseButton';

export default function SetMissionContentsModal({
  closeMission,
  isOpen,
  setNextStep,
}: MissionModalProps) {
  const {userId} = useRecoilValue(userInfoAtom);
  const {missionMessage} = useTodayMission(userId);

  const content = useInput<HTMLTextAreaElement>();
  const setMissionState = useSetRecoilState(missionStateAtom);
  const [uploadedImg, setUploadedImg] = useState<string | ArrayBuffer>(''); // 이미지 미리보기용

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 이미지 객체를 생성하여 크기 확인
        const img = new Image();
        img.onload = () => {
          setUploadedImg(reader.result as string); // 타입 단언을 사용하여 string으로 설정
        };
        img.src = reader.result as string; // 여기도 타입 단언을 사용하여 string으로 설정
      };
      reader.readAsDataURL(file);
      setMissionState((prev) => ({
        ...prev,
        missionCompleteImage: file,
      }));
    }
  };

  const handleCheckExistImageMessage = () => {
    if (!uploadedImg || content.value.trim().length === 0) {
      alert('이미지와 메시지를 모두 입력해야 합니다.');
    } else {
      setNextStep();
    }
  };

  useEffect(() => {
    setMissionState((prev) => ({
      ...prev,
      missionCompleteContent: content.value,
    }));
  }, [content.value]);

  return (
    <Modal
      modalTitle={'미션함'}
      isOpen={isOpen}
      onClose={closeMission}
      imageType={'LargeModal'}
    >
      <ModalCloseButton onClick={closeMission} />
      <SMission.ModalInnerWrapper>
        <S.ModalText2>{missionMessage}</S.ModalText2>
        <S.ImageUploadLabel htmlFor="image-upload">
          <S.ImageInput
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          {uploadedImg && <S.ImagePreview src={uploadedImg as string} />}
        </S.ImageUploadLabel>
        <S.MessageArea
          placeholder="메시지를 입력하세요."
          value={content.value}
          onChange={content.handleChange} // 이 부분은 수정 필요할 수 있음
        />
        <S.ModalOkButtonWrapper>
          <ModalOKButton
            buttonName="미션 제출"
            onClick={handleCheckExistImageMessage}
          />
        </S.ModalOkButtonWrapper>
      </SMission.ModalInnerWrapper>
    </Modal>
  );
}
