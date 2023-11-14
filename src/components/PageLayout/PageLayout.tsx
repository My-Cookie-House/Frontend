import {useLayoutEffect, useState} from 'react';

import * as S from './style';
import {useLocation} from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

// 로고 안들어가는 경로들
const NO_LOGO_PATHS = ['/build/custom/icing'];

export default function PageLayout({children}: Props) {
  const [logo, setLogo] = useState(true);
  const location = useLocation();
  const {pathname} = useLocation();

  useLayoutEffect(() => {
    if (NO_LOGO_PATHS.includes(pathname)) setLogo(false);
    else setLogo(true);
  }, [pathname]);

  return (
    <S.Layout>
      <S.Wrapper isSplashScreen={location.pathname === '/'}>
        {logo && <S.Logo>로고...</S.Logo>}
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}
