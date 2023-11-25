import {keyframes, styled} from 'styled-components';
import ClosedEnvelopeImg from '../../assets/Envelope/ClosedEnvelope.webp';
import OpenedEnvelopeImg from '../../assets/Envelope/OpenedEnvelope.webp';
import ImageUploadModalImg from '../../assets/Button/ImageUploadButton.svg';
import {ImagePreviewProps} from '../../type/type';
import TodayMessageLineImg from '../../assets/Icons/TodayMessageLine.svg';
import ShowMoreMenuButtonImg from '../../assets/Button/ShowMoreMenuButton.svg';
import ChangeButtonImg from '../../assets/Button/ChangeButton.svg';

const ShareImg = styled.img`
  width: 19px;
  height: 19px;
`;

const FurnitureLayerWrapper = styled.div`
  position: relative;
  border: none;
`;

const FurnitureLayerPreview = styled.img`
  position: absolute;
  width: 355px;
  height: 533px;
  top: 0;
  left: 0;
  border: none;
`;

const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
  border: none;
`;

const ModalText = styled.div`
  color: ${(props) => props.theme.colors.textBrown};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 54.01px;
  margin-bottom: 29px;
`;

const ModalOkButtonWrapper = styled.div`
  margin-top: 45px;
`;

const ModalText2 = styled(ModalText)`
  margin-top: -8px;
`;

const swapAnimation = keyframes`
    0%, 50% { background-image: url(${ClosedEnvelopeImg}); }
    50.01%, 100% { background-image: url(${OpenedEnvelopeImg}); }
`;

const SwappingEnvelope = styled.div`
  width: 148px;
  height: 148px;
  background-image: url(${ClosedEnvelopeImg});
  background-size: 148px 148px;
  animation: ${swapAnimation} 1.5s infinite;
  margin-bottom: -45px;
`;

const MessageArea = styled.textarea`
  position: relative;
  width: 220px;
  height: 110px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.textBrown};
  overflow: auto;
  padding: 13px;
  resize: none;
  background-color: rgba(87, 46, 22, 0.15);
  font-size: 16px;
  &::placeholder {
    color: rgba(87, 46, 22, 0.6);
    font-size: 16px;
  }
  margin-bottom: -22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const CheckTextLength = styled.div`
  margin-top: -10px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  font-size: 14px;
  font-weight: 400;
  color: rgba(87, 46, 22, 0.6) !important;
  margin-bottom: 53px;
`;

const ImageUploadLabel = styled.label`
  cursor: pointer;
  width: 236.538px;
  height: 236.538px;
  background-image: url(${ImageUploadModalImg});
  background-size: cover;
  display: inline-block;
  position: relative;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 236.538px;
  height: 236.538px;
  background-image: url(${ImageUploadModalImg});
  background-size: cover;
  display: inline-block;
  position: relative;
  margin-bottom: 15px;
`;

const ImageInput = styled.input`
  opacity: 0; // 투명하게 설정
  position: absolute; // 절대적 위치 설정
  width: 100%;
  height: 100%;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const ImagePreview = styled.div<ImagePreviewProps>`
  width: 232px;
  height: 232px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-image: url(${(props) => props.src});
  margin-top: 2.5px;
  margin-left: 2.5px;
`;

const GuestBookEntryGrid = styled.div`
  max-height: 550px; // 최대 높이
  overflow-y: auto; // 세로 스크롤을 활성화하여 내용이 넘칠 경우 스크롤이 생김
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2개의 열
  gap: 12.5px; // 그리드 간격
`;

const DecorationButtonContainer = styled.div`
  display: flex; // 가로로 나열하기 위해 Flexbox를 사용합니다.
  justify-content: space-between; // 버튼 사이의 간격을 균등하게 배치합니다.
  align-items: center; // 수직 가운데 정렬합니다.
  gap: 7.78px; // 그리드 간격
  margin-bottom: -30px;
`;

const TodayMessageLine = styled.div`
  background-image: url(${TodayMessageLineImg});
  background-size: 237px 26.8px;
  width: 237px;
  height: 26.8px;
  margin-bottom: 20px;
`;

const ShowMessage = styled.div`
  position: relative;
  width: 220px;
  height: 140px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.textBrown};
  overflow: auto;
  padding: 13px;
  resize: none;
  background-color: rgba(87, 46, 22, 0.15);
  font-size: 16px;
  margin-bottom: -22px;
`;

const ShowMoreMenuButton = styled.button`
  position: absolute;
  width: 14px;
  height: 14px;
  border: none;
  background-image: url(${ShowMoreMenuButtonImg});
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  top: 28.5px;
  right: 85px;
`;

const TextAndButtonWrapper = styled.div`
  display: flex;
  grid-template-columns: repeat(2, 1fr); // 2개의 열
  gap: 5px; // 그리드 간격
  justify-content: space-between; // 버튼 사이의 간격을 균등하게 배치합니다.
  align-items: center; // 수직 가운데 정렬합니다.
`;

const ChangeButton = styled.button`
  position: absolute;
  width: 108px;
  height: 78px;
  border: none;
  background-image: url(${ChangeButtonImg});
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  top: 45px;
  right: 85px;
  color: #572e16;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
`;

export const S = {
  ModalInnerWrapper,
  ModalText,
  SwappingEnvelope,
  Form,
  MessageArea,
  CheckTextLength,
  ImageInput,
  ImageUploadLabel,
  ImagePreview,
  GuestBookEntryGrid,
  ModalText2,
  ModalOkButtonWrapper,
  DecorationButtonContainer,
  TodayMessageLine,
  ShowMessage,
  ImageWrapper,
  ShowMoreMenuButton,
  TextAndButtonWrapper,
  ChangeButton,
  ShareImg,
  FurnitureLayerWrapper,
  FurnitureLayerPreview,
};
