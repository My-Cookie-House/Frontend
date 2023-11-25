import * as S from './style';
import BuildTypeButton from '../../components/Buttons/BuildTypeButton/BuildTypeButton';
import LongButton from '../../components/Buttons/LongButton/LongButton';
import {useCallback, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  BuildStateAtom,
  buildStateAtom,
  initalBuildState,
} from '../../atoms/buildAtom';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import Building from '../../assets/House/Build/Building.webp';
import BuildComplete from '../../assets/House/Build/BuildComplete.webp';

export default function Build() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);
  const user = useRecoilValue(userInfoAtom);
  const handleRandomSelect = useCallback(
    () =>
      setBuildState((prev) =>
        prev.type === 'random'
          ? {...prev, type: 'unselected'}
          : {...prev, type: 'random'},
      ),
    [buildState.type],
  );
  const handleCustomSelect = useCallback(
    () =>
      setBuildState((prev) =>
        prev.type === 'custom'
          ? {...prev, type: 'unselected'}
          : {...prev, type: 'custom'},
      ),
    [buildState.type],
  );

  // 뒤로가기 했을 때, 이전에 선택했던 것들이 남지 않게 초기화 시켜준다
  useEffect(() => {
    setBuildState(initalBuildState);

    const img = new Image();
    img.src = Building;
    const img2 = new Image();
    img2.src = BuildComplete;
  }, []);

  return (
    <>
      <S.Title>쿠키하우스 입주하기</S.Title>
      <S.Description>하나를 선택해주세요!</S.Description>
      <BuildTypeButton
        onClick={handleRandomSelect}
        margin="19.68px 0 0 0"
        title="랜덤으로 분양받을래요!"
        description={'랜덤으로 커스텀된 쿠키하우스에\n입주하게 됩니다'}
        dark={buildState.type === 'random'}
      />
      <BuildTypeButton
        onClick={handleCustomSelect}
        margin="22px 0 0 0"
        title="제가 직접 지을래요!"
        description={'과자를 선택해 쿠키하우스를 커스텀하고\n입주하게 됩니다'}
        dark={buildState.type === 'custom'}
      />
      <LongButton
        route={`/build/${
          buildState.type === 'custom' ? 'custom/cookies' : 'random'
        }`}
        margin="84px 0 0 0"
        disabled={buildState.type === 'unselected'}
      >
        <S.NextStepText>집 보러가기</S.NextStepText>
      </LongButton>
    </>
  );
}
