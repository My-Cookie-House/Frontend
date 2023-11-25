import * as S from './style';
import * as SBuild from '../style';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {buildStateAtom} from '../../../atoms/buildAtom';
import Building from '../../../assets/House/Build/Building.webp';
import BuildComplete from '../../../assets/House/Build/BuildComplete.webp';

const COOKIE_COUNT = 6;
const ICING_COUNT = 4;
const WALLPAPER_COUNT = 8;

export default function Random() {
  const setBuildState = useSetRecoilState(buildStateAtom);

  const [isConstructing, setIsConstructing] = useState(true);

  // 쿠키 2개 랜덤 생성
  const makeRandomCookies = () => {
    const cookie1 = Math.floor(Math.random() * COOKIE_COUNT + 1);
    let cookie2 = Math.floor(Math.random() * COOKIE_COUNT + 1);

    // 쿠키 2개가 다르도록 보장
    while (cookie1 === cookie2) {
      cookie2 = Math.floor(Math.random() * COOKIE_COUNT + 1);
    }

    setBuildState((prev) => ({...prev, cookieIds: [cookie1, cookie2]}));
  };

  // 아이싱 랜덤 생성
  const makeRandomIcing = () => {
    const icing = Math.floor(Math.random() * ICING_COUNT + 1);
    setBuildState((prev) => ({...prev, icingId: icing}));
  };

  // 벽지 랜덤 생성
  const makeRandomWallpaper = () => {
    const wallpaper = Math.floor(Math.random() * WALLPAPER_COUNT + 1);
    setBuildState((prev) => ({...prev, wallpaperId: wallpaper}));
  };

  useEffect(() => {
    makeRandomCookies();
    makeRandomIcing();
    makeRandomWallpaper();
    setTimeout(() => setIsConstructing(false), 1500);
  }, []);

  return (
    <>
      <SBuild.Title>랜덤 쿠키하우스를 선택했어요!</SBuild.Title>
      <SBuild.Description>
        {isConstructing
          ? '공사중이니 조금만 기다려주세요!'
          : '쿠키하우스가 완성되었어요!'}
      </SBuild.Description>
      <S.Image
        alt={isConstructing ? '공사중 일러스트' : '공사완료 일러스트'}
        src={isConstructing ? Building : BuildComplete}
      />
      <LongButton dark={isConstructing} route="/build/preview">
        <SBuild.NextStepText>
          {isConstructing ? '쿠키하우스 공사중' : '집 보러가기'}
        </SBuild.NextStepText>
      </LongButton>
    </>
  );
}
