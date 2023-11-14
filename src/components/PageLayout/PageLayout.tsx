import {useLayoutEffect, useState} from 'react';
import Envelope from '../../assets/Button/envelope.svg';
import Book from '../../assets/Button/book.svg';
import BackButton from '../../assets/Button/BackButton.svg';
import * as S from './style';
import {useLocation} from 'react-router-dom';
import Button from '../Buttons/Button';
import Mission from '../../pages/Mission/Mission';

type Props = {
  children: React.ReactNode;
  guestBook?: string; // 방문록 (경로)
  mission?: boolean; // 미션
  goBack?: string; // 뒤로가기 (경로)
};

// 로고 안들어가는 경로들
const NO_LOGO_PATHS = ['/build/custom/icing', '/build/preview'];

export default function PageLayout({
  children,
  guestBook,
  mission = false,
  goBack,
}: Props) {
  const [logo, setLogo] = useState(true);
  const location = useLocation();
  const {pathname} = useLocation();

  const handleMissionClick = () => {
    return (
      <Mission />
    )
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
            {goBack && (
              <S.GoBackContainer>
                <Button
                  width={10}
                  height={19}
                  background={BackButton}
                  route={goBack}
                />
              </S.GoBackContainer>
            )}
            <S.Logo>로고...</S.Logo>
            <S.ButtonBox>
              {mission && (
                <Button width={25} height={18} background={Envelope} 
                onClick={handleMissionClick} // 미션 버튼 클릭 핸들러
                />
              )}
              {guestBook && (
                <Button
                  width={22}
                  height={19}
                  background={Book}
                  route={guestBook} // TODO: 실제 유저 아이디 넣어줘야 함
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
