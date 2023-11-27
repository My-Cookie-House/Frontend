import {styled} from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const NameInput = styled.input`
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

export const CheckTextLength = styled.div`
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

export const LetterArea = styled.textarea`
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
