import * as S from './style';

type Props = {
  children: React.ReactNode;
};
export default function PageLayout({children}: Props) {
  return (
    <S.Layout>
      <S.Wrapper>
        <S.Logo>로고...</S.Logo>
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}
