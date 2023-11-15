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
  mission?: () => void; // mission prop을 함수 타입으로 
  goBack?: string; // 뒤로가기 (경로)
};

// 로고 안들어가는 경로들
const NO_LOGO_PATHS = ['/build/custom/icing', '/build/preview'];

export default function PageLayout({
  children,
  guestBook,
  mission,
  goBack,
}: Props) {
  const [logo, setLogo] = useState(true);
  const location = useLocation();
  const {pathname} = useLocation();
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  // Mission 버튼 클릭 핸들러
  const handleMissionClick = () => {
    setIsMissionOpen(true); // Mission 모달 상태를 true로 설정하여 모달을 열게 함
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
                onClick={handleMissionClick} // Mission 버튼 클릭 시 핸들러 호출
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

      {/* Mission 모달 상태에 따라 Mission 컴포넌트 렌더링 */}
      {isMissionOpen && (
        <Mission
          isOpen={isMissionOpen}
          onClose={() => setIsMissionOpen(false)}
        />
      )}
    </S.Layout>
  );
}
