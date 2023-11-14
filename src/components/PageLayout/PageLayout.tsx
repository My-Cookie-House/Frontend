import {useLocation} from 'react-router-dom';
import * as S from './style';

type Props = {
  children: React.ReactNode;
};

export default function PageLayout({children}: Props) {
  const location = useLocation();

  return (
    <S.Layout>
      <S.Wrapper isSplashScreen={location.pathname === '/'}>
        <S.Logo>로고...</S.Logo>
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}
