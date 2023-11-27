import * as S from './style';
import * as SBuild from '../../style';
import WallpaperColor from '@/assets/WallpaperColor';
import DecorationButton from '../../../../components/Buttons/DecorationButton/DecorationButton';
import LongButton from '../../../../components/Buttons/LongButton/LongButton';
import {useRecoilState} from 'recoil';
import {BuildStateAtom, buildStateAtom} from '../../../../atoms/buildAtom';
import Overlap from '../../../../components/Overlap/Overlap';
import WallpaperPreview from '@/assets/WallpaperPreview';
import InsideNone from '@/assets/House/Build/InsideNone.webp';
export default function Wallpaper() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const handleSelect = (id: number) => {
    setBuildState((prev) => ({...prev, wallpaperId: id}));
  };
  return (
    <>
      <SBuild.Title marginTop="40px">
        {'내부 벽지도 선택할 수 있어요!'}
      </SBuild.Title>

      <Overlap
        width={300}
        height={450}
        margin="30px 0 0 0"
        imgs={[
          InsideNone,
          WallpaperPreview[`WallpaperPreview${buildState.wallpaperId}`],
        ]}
      />

      <SBuild.Description>
        {'벽지 1개를 선택해주세요!\n어울리는 가구들도 미리 보여드릴게요'}
      </SBuild.Description>
      <S.Box>
        {WallpaperColor.map((wallpaper, idx) => (
          <DecorationButton
            key={idx}
            image={wallpaper}
            size={79}
            onClick={() => handleSelect(idx + 1)}
            dark={buildState.wallpaperId === idx + 1}
          />
        ))}
      </S.Box>
      <LongButton
        margin="35px 0 0 0"
        route="/build/preview"
        disabled={buildState.wallpaperId === null}
      >
        <SBuild.NextStepText>{'다 골랐어요!'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
