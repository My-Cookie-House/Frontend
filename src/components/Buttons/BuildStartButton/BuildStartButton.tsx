import Button from '../Button';
import LongButtonImg from '../../../assets/Button/LongButton.svg';

function BuildStartButton() {
  return (
    <Button
      route={'/build'}
      width={237.5}
      height={50}
      background={LongButtonImg}
      margin={"130px 0 0 0"}
    >
      가볼까요?
    </Button>
  );
}

export default BuildStartButton;
