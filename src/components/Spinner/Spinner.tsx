import * as S from './style';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Spinner() {
  return (
    <S.Wrapper>
      <BeatLoader color="#572E16" />
    </S.Wrapper>
  );
}
