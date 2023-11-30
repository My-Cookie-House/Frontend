import {styled} from 'styled-components';
import WirteGuestBookButtonImg from '../../assets/Button/WriteGuestBookButton.svg';
import OrnamentAuthorBoxImg from '../../assets/ContainerBox/OrnamentAuthorBox.svg';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  width: 304px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const WirteGuestBookButton = styled.div`
  position: absolute;
  top: 102px;
  left: 230px;
  width: 18.933px;
  height: 18.933px;
  background-image: url(${WirteGuestBookButtonImg});
  background-size: 18.933px 18.933px;
  z-index: 4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const NameInput = styled.input`
  //position: absolute;
  margin-top: 60px;
  width: 225px;
  height: 40px;
  border: dotted;
  border-color: ${(props) => props.theme.colors.textBrown};
  border-radius: 30px;
  color: ${(props) => props.theme.colors.textBrown};
  margin-bottom: 32px;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  padding-left: 10px;
  &::placeholder {
    color: ${(props) => props.theme.colors.textBrown};
    font-size: 16px;
  }
`;

const CheckTextLength = styled.div`
  margin-top: -10px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-self: flex-end; // 이 부분을 추가
  font-size: 14px;
  font-weight: 400;
  color: rgba(87, 46, 22, 0.6) !important;
  margin-bottom: 53px;
`;

const LetterArea = styled.textarea`
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
  outline: none;
  &::placeholder {
    color: rgba(87, 46, 22, 0.6);
    font-size: 16px;
  }
  margin-bottom: -22px;
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

const OrnamentButtonWrapper = styled.div`
  display: flex;
  flex-direction: row; // 방향을 가로로 변경
  flex-wrap: wrap; // 여러 행으로 나누기
  align-items: center;
  justify-content: center; // 가운데 정렬
  gap: 5px; // 항목 간 간격 설정
  margin-bottom: 53.62px;
`;

const GuestBookEntryGrid = styled.div`
  max-height: 550px; // 최대 높이
  overflow-y: auto; // 세로 스크롤을 활성화하여 내용이 넘칠 경우 스크롤이 생김
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3개의 열
  gap: 34.71px; // 그리드 간격
  margin-bottom: 16px; // 하단 여백
  margin-top: 50px;
`;

const GuestBookEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorName = styled.div`
  background-image: url(${OrnamentAuthorBoxImg});
  background-size: 60px 25.2px;
  width: 60px;
  height: 25.2px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 14px;
`;

const OrnamentButton = styled.button`
  background-size: 71px 71px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  width: 71px; // 이미지 크기에 따라 조정
  height: 71px; // 이미지 크기에 따라 조정
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const OrnamentImg = styled.div`
  background-size: 90px 90px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  width: 90px; // 이미지 크기에 따라 조정
  height: 90px; // 이미지 크기에 따라 조정
  border: none;
  cursor: pointer;
`;

const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
`;

const GuestBookContent = styled.div`
  width: 217px;
  height: 138px;
  background: rgba(87, 46, 22, 0.15);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  overflow: auto;
`;

const GuestBookNoneWrapper = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 150px;
`;

const GuestBookNone = styled.span`
  color: rgba(87, 46, 22, 1);
`;

export const S = {
  Container,
  WirteGuestBookButton,
  ButtonWrapper,
  Form,
  NameInput,
  CheckTextLength,
  LetterArea,
  ModalText,
  OrnamentButtonWrapper,
  GuestBookEntryGrid,
  GuestBookEntry,
  AuthorName,
  OrnamentButton,
  OrnamentImg,
  ModalInnerWrapper,
  GuestBookContent,
  GuestBookNone,
  GuestBookNoneWrapper,
};
