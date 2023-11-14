import {useLayoutEffect, useState} from 'react';
import Envelope from '../../assets/Button/envelope.svg';
import Book from '../../assets/Button/book.svg';

import * as S from './style';
import {useLocation} from 'react-router-dom';
import Button from '../Buttons/Button';

type Props = {
  children: React.ReactNode;
  guestBook?: boolean;
  mission?: boolean;
};

// 로고 안들어가는 경로들
const NO_LOGO_PATHS = ['/build/custom/icing', '/build/preview'];

export default function PageLayout({
  children,
  guestBook = false,
  mission = false,
}: Props) {
  const [logo, setLogo] = useState(true);
  const location = useLocation();
  const {pathname} = useLocation();

  const handleMissionClick = () => {
    // TODO: 미션 페이지 만들어지면 추가해야함
  };

  useLayoutEffect(() => {
    if (NO_LOGO_PATHS.includes(pathname)) setLogo(false);
    else setLogo(true);
  }, [pathname]);

  return (
    <S.Layout>
      <S.Wrapper isSplashScreen={location.pathname === '/'}>
        {logo && (
          <S.Nav>
            <S.Logo>로고...</S.Logo>
            <S.ButtonBox>
              {mission && (
                <Button width={25} height={18} background={Envelope} />
              )}
              {guestBook && (
                <Button
                  width={22}
                  height={19}
                  background={Book}
                  route="/:id/guests"
                />
              )}
            </S.ButtonBox>
          </S.Nav>
        )}
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}
