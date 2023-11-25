import Button from '../Button';
import LongButtonImg from '../../../assets/Button/LongButton.svg';
import * as S from './style'

function BuildStartButton() {
  return (
    <Button
      route={'/build'}
      width={237.5}
      height={50}
      background={LongButtonImg}
      margin={"160px 0 0 0"}
    >
      <S.ButtonText>
        가볼까요?
      </S.ButtonText>
    </Button>
  );
}

export default BuildStartButton;
