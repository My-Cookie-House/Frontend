import {styled} from 'styled-components';
import theme from '../../theme';

const Title = styled.h1`
  margin-top: 48.3px;
  margin-bottom: 39px;
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BottomText = styled.h2`
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 15.47px;
`;

const ExtraText = styled.h3`
  color: #f9f1e1;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Centering = styled.div`
  display: flex;
  justify-content: center;
`;

export const S = {
  Title,
  BottomText,
  ExtraText,
  Centering,
};
