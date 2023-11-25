import Button from '../Button';
import SkipButtonImage from '../../../assets/OnboardingAssets/skipButton.svg';
import * as S from './style';

function SkipButton() {
  return (
    <S.SkipButtonWrapper>
    <Button
      route={'/build'}
      width={49}
      height={27}
      background={SkipButtonImage}
      margin={"135px 0 0 0"}
    />
    </S.SkipButtonWrapper>
  );
}

export default SkipButton;
