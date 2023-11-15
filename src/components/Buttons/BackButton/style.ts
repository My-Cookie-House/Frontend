import {styled} from 'styled-components';
import BackButtonImg from '../../../assets/Button/BackButton.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const BackButton = styled.div`
  position: absolute;
  top: 91.78px;
  margin-right: 330px;
  width: 9.861px;
  height: 18.933px;
  background-image: url(${BackButtonImg});
  background-size: 9.861px 18.933px;
  text-align: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

export const S = {
  Container,
  BackButton,
};
