import Button from '../Button';
import LongButtonImg from '../../../assets/Button/LongButton.svg';

function SkipButton() {
  return (
    <Button
      route={'/build'}
      width={237.5}
      height={50}
      background={LongButtonImg}
    >
      가볼까요?
    </Button>
  );
}

export default SkipButton;
