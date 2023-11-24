// RenderMissionModalContent.tsx
import React from 'react';
import * as S from './style'; // 경로에 따라 수정하세요
import ModalOKButton from '../ModalOKButton/ModalOKButton';
import DecorationButton from '../Buttons/DecorationButton/DecorationButton';
import Furnitures from '../../assets/Furniture';
import {RenderMissionModalContentProps} from '../../interfaces/mission';
import {useNavigate} from 'react-router-dom';
import useInput from '@/hooks/useInput';

const RenderMissionModalContent: React.FC<RenderMissionModalContentProps> = ({
  modalStep,
  missionMessage,
  missionId,
  data,
  uploadedImage,
  handleFileInputChange,
  handleCheckExistImageMessage,
  handleOpenShowMoreMenu,
  showChangeButton,
  onClose,
}) => {
  const navigate = useNavigate();
  const content = useInput<HTMLTextAreaElement>(); // 편지 내용을 관리하는 상태

  // 날짜 형식을 "MM월 dd일"로 포매팅하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 5
  if (data) {
    return (
      <>
        <S.ModalText2>{missionMessage}</S.ModalText2>
        <S.ShowMoreMenuButton />
        <S.ImageWrapper>
          <S.ImagePreview src={data?.missionCompleteImage} />
        </S.ImageWrapper>
        <S.TodayMessageLine />
        <S.ShowMessage>{data?.missionCompleteContent}</S.ShowMessage>
      </>
    );
  }

  // 1
  switch (modalStep) {
    case 1:
      return (
        <>
          <S.SwappingEnvelope />
          <S.ModalText>미션이 도착했어요!</S.ModalText>
          <S.ModalOkButtonWrapper>
            <ModalOKButton
              buttonName="확인하기"
              onClick={() => handleCheckExistImageMessage()}
            />
          </S.ModalOkButtonWrapper>
        </>
      );
    // 2
    case 2:
      return (
        <>
          <S.ModalText2>{missionMessage}</S.ModalText2>
          <S.ImageUploadLabel htmlFor="image-upload">
            <S.ImageInput
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            {uploadedImage && <S.ImagePreview src={uploadedImage as string} />}
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
        </>
      );
    // 3
    case 3:
      return (
        <>
          <S.GuestBookEntryGrid>
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}1`]}
            />
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}2`]}
            />
            <DecorationButton
              size={90}
              image={Furnitures[`Furniture${missionId}3`]}
            />
          </S.GuestBookEntryGrid>
          <S.ModalOkButtonWrapper>
            <ModalOKButton
              buttonName="보러가기"
              onClick={() => {
                navigate(`custom/furniture`);
                onClose();
              }}
            />
          </S.ModalOkButtonWrapper>
        </>
      );

    case 5:
      return (
        <>
          <S.TextAndButtonWrapper>
            <S.ModalText2>{missionMessage}</S.ModalText2>
            <S.ShowMoreMenuButton onClick={handleOpenShowMoreMenu} />
            {showChangeButton && (
              <S.ChangeButton>이미지/메시지 수정</S.ChangeButton>
            )}
          </S.TextAndButtonWrapper>

          <S.ImageWrapper>
            <S.ImagePreview src={data?.missionCompleteImage} />
          </S.ImageWrapper>
          <S.TodayMessageLine />
          <S.ShowMessage>{data?.missionCompleteContent}</S.ShowMessage>
        </>
      );
    default:
      return null;
  }
};

export default RenderMissionModalContent;
