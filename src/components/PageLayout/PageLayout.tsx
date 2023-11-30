import {useLayoutEffect, useState} from 'react';
import Envelope from '../../assets/Button/envelope.webp';
import BackButton from '../../assets/Button/BackButton.svg';
import * as S from './style';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from '../Buttons/Button';
import Mission from '../Mission/Mission';
import Logo from '../../assets/Background/Logo.webp';
import Image1 from '../../assets/OnboardingAssets/onboarding1.svg';
import Image2 from '../../assets/OnboardingAssets/onboarding2.svg';
import Image3 from '../../assets/OnboardingAssets/onboarding3.svg';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {indexAtom} from '../../atoms/sideButtonAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import IcingBackground from '@/assets/Background/BackgroundIcing.webp';
import AlarmIcon from '@/assets/Mission/AlarmIcon.webp';
import {userInfoAtom} from '@/atoms/loginStateAtom';

type Props = {
  children: React.ReactNode;
  mission?: boolean; // mission prop을 함수 타입으로
  goBack?: string; // 뒤로가기 (경로)
};

const images = [CookieHouse, Image1, Image2, Image3];

export default function PageLayout({children, mission = false, goBack}: Props) {
  const navigate = useNavigate();
  const [nav, setNav] = useState(true);
  const [button, setButton] = useState(false);
  const {pathname} = useLocation();
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [index, setIndex] = useRecoilState<number>(indexAtom);
  const {todayMissionComplete} = useRecoilValue(userInfoAtom);

  const handleLogoClick = () => {
    navigate('/');
  };

  // Mission 버튼 클릭 핸들러
  const handleMissionClick = () => {
    setIsMissionOpen(true); // Mission 모달 상태를 true로 설정하여 모달을 열게 함
  };

  useLayoutEffect(() => {
    if (pathname.includes('/custom/furniture')) setNav(false);
    if (pathname === '/') setNav(false);
    else setNav(true);
  }, [pathname]);

  return (
    <S.Layout>
      <S.BgWrapper isSplashScreen={pathname === '/'}>
        {nav && <S.IcingImg src={IcingBackground} />}

        <S.Wrapper>
          {nav && (
            <>
              <S.Nav>
                {goBack && (
                  <S.GoBackContainer>
                    <Button
                      width={12}
                      height={23}
                      background={BackButton}
                      route={goBack}
                    />
                  </S.GoBackContainer>
                )}
                {pathname !== '/' && (
                  <S.LogoImg onClick={handleLogoClick} src={Logo} />
                )}
                <S.ButtonBox>
                  {mission && (
                    <>
                      <S.ButtonWrapper>
                        {!todayMissionComplete && <S.Alarm src={AlarmIcon} />}
                        <Button
                          width={25}
                          height={19}
                          background={Envelope}
                          onClick={handleMissionClick} // Mission 버튼 클릭 시 핸들러 호출
                        />
                      </S.ButtonWrapper>
                    </>
                  )}
                </S.ButtonBox>
              </S.Nav>
            </>
          )}
          {children}
        </S.Wrapper>
      </S.BgWrapper>
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
