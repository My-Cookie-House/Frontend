import {useLayoutEffect, useState} from 'react';
import Envelope from '../../assets/Button/envelope.png';
import BackButton from '../../assets/Button/BackButton.svg';
import * as S from './style';
import {useLocation} from 'react-router-dom';
import Button from '../Buttons/Button';
import Mission from '../Mission/Mission';
import Logo from '../../assets/Background/Logo.png';
import LeftButton from '../../assets/Button/LeftButton.svg';
import RightButton from '../../assets/Button/RightButton.svg';
import {
  handleLeftClick,
  handleRightClick,
} from '../../components/OnboardingComponents/Slider';
import Image1 from '../../assets/OnboardingAssets/onboarding1.svg';
import Image2 from '../../assets/OnboardingAssets/onboarding2.svg';
import Image3 from '../../assets/OnboardingAssets/onboarding3.svg';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {indexAtom} from '../../atoms/sideButtonAtom';
import {useRecoilState} from 'recoil';
import IcingBackground from '@/assets/Background/BackgroundIcing.png';

type Props = {
  children: React.ReactNode;
  guestBook?: string; // 방문록 (경로)
  mission?: () => void; // mission prop을 함수 타입으로
  goBack?: string; // 뒤로가기 (경로)
};

const images = [CookieHouse, Image1, Image2, Image3];

export default function PageLayout({
  children,
  guestBook,
  mission,
  goBack,
}: Props) {
  const [nav, setNav] = useState(true);
  const [button, setButton] = useState(false);
  const location = useLocation();
  const {pathname} = useLocation();
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [index, setIndex] = useRecoilState<number>(indexAtom);

  // Mission 버튼 클릭 핸들러
  const handleMissionClick = () => {
    setIsMissionOpen(true); // Mission 모달 상태를 true로 설정하여 모달을 열게 함
  };

  useLayoutEffect(() => {
    if (pathname.includes('/custom/furniture')) setNav(false);
    else setNav(true);
  }, [pathname]);

  return (
    <S.Layout>
      {button && (
        <S.LeftButtonImage
          src={LeftButton}
          onClick={() => handleLeftClick(index, setIndex, images)}
        />
      )}
      <S.BgWrapper isSplashScreen={location.pathname === '/'}>
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
                <S.LogoImg src={Logo} />
                <S.ButtonBox>
                  {/* {mission && ( */}
                  <Button
                    width={25}
                    height={19}
                    background={Envelope}
                    onClick={handleMissionClick} // Mission 버튼 클릭 시 핸들러 호출
                  />
                  {/* )} */}
                  {/** TODO: 방명록 접근 방법 수정될 예정  */}
                  {/* {guestBook && (
                  <Button
                    width={22}
                    height={19}
                    background={Book}
                    route={guestBook} 
                  />
                )} */}
                </S.ButtonBox>
              </S.Nav>
            </>
          )}
          {children}
        </S.Wrapper>
      </S.BgWrapper>
      {button && (
        <S.RightButtonImage
          src={RightButton}
          onClick={() => handleRightClick(index, setIndex, images)}
        />
      )}
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
