import {styled} from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
export const ModalText = styled.div`
  color: ${(props) => props.theme.colors.textBrown};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 54.01px;
  margin-bottom: 29px;
`;

export const OrnamentButtonWrapper = styled.div`
  display: flex;
  flex-direction: row; // 방향을 가로로 변경
  flex-wrap: wrap; // 여러 행으로 나누기
  align-items: center;
  justify-content: center; // 가운데 정렬
  gap: 5px; // 항목 간 간격 설정
  margin-bottom: 53.62px;
`;
