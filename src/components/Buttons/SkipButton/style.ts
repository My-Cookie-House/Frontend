import {styled} from 'styled-components';
import ButtonImg from '../../../assets/OnboardingAssets/skipButton.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const SkipButton = styled.div`
  width: 49px;
  height: 27px;
  background-size: 49px 27px;
  background-image: url(${ButtonImg});
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

export const S = {
  Container,
  SkipButton,
};
