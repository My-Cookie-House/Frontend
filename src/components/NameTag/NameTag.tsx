import * as S from './style';

type Props = {
  name: string;
};

export default function NameTag({name}: Props) {
  return (
    <S.NameTagBox>
      <S.Text>{name}</S.Text>
    </S.NameTagBox>
  );
}
