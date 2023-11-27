import * as S from './style';
import * as SBuild from '../../style';
import Icings from '../../../../assets/Icings';
import DecorationButton from '../../../../components/Buttons/DecorationButton/DecorationButton';
import LongButton from '../../../../components/Buttons/LongButton/LongButton';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  BuildStateAtom,
  buildStateAtom,
  sortedCookieIdsSelector,
} from '../../../../atoms/buildAtom';
import Cookies from '../../../../assets/House/Outside/Cookies';
import Overlap from '../../../../components/Overlap/Overlap';
import IcingLayers from '../../../../assets/House/Outside/Icings/index';
import WallpaperPreview from '@/assets/WallpaperPreview';
import {useEffect} from 'react';

export default function Icing() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const [num1, num2] = useRecoilValue(sortedCookieIdsSelector);

  const handleSelect = (id: number) => {
    setBuildState((prev) => ({...prev, icingId: id}));
  };

  useEffect(() => {
    Object.values(WallpaperPreview).forEach((wallpaper) => {
      const img = new Image();
      img.src = wallpaper;
    });
  }, []);
  return (
    <>
      <SBuild.Title marginTop="40px">
        {'쿠키하우스가 완성되었어요!\n이제 하우스를 꾸며볼까요?'}
      </SBuild.Title>

      <Overlap
        width={300}
        height={414}
        margin="30px 0 0 0"
        imgs={[
          Cookies[`Cookie${num1}${num2}`],
          IcingLayers[`Icing${buildState.icingId}`],
        ]}
      />

      <SBuild.Description>{'아이싱 1개를 선택해주세요!'}</SBuild.Description>
      <S.Box>
        {Icings.map((icing, idx) => (
          <DecorationButton
            key={idx}
            image={icing}
            size={79}
            onClick={() => handleSelect(idx + 1)}
            dark={buildState.icingId === idx + 1}
          />
        ))}
      </S.Box>
      <LongButton
        margin="35px 0 0 0"
        route="/build/custom/wallpaper"
        disabled={buildState.icingId === null}
      >
        <SBuild.NextStepText>{'다 골랐어요!'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
