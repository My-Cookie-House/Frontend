import Button from '../Button';
import SkipButtonImage from '../../../assets/OnboardingAssets/skipButton.svg';

function SkipButton() {
  return (
    <Button
      route={'/build'}
      width={49}
      height={27}
      background={SkipButtonImage}
    ></Button>
  );
}

export default SkipButton;
