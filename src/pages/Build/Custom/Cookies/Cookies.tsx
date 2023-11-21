import * as S from './style';
import * as SBuild from '../../style';
import CookiesImgs from '../../../../assets/Cookies';
import DecorationButton from '../../../../components/Buttons/DecorationButton/DecorationButton';
import LongButton from '../../../../components/Buttons/LongButton/LongButton';
import {useRecoilState} from 'recoil';
import {BuildStateAtom, buildStateAtom} from '../../../../atoms/buildAtom';
import CookieLayers from '../../../../assets/House/Outside/Cookies';
import IcingLayers from '../../../../assets/House/Outside/Icings';
import {useEffect} from 'react';

export default function Cookies() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const handleToggleSelect = (id: number) => {
    // 쿠키 id는 인덱스 +1

    // 만약 이미 두 개가 선택된 상태면 더 이상 선택 불가
    // 변경 하려면 이전에 선택한 쿠키를 다시 클릭해서 취소해줘야 한다
    if (
      !buildState.cookieIds.includes(id) &&
      buildState.cookieIds[0] !== null &&
      buildState.cookieIds[1] !== null
    )
      return;

    setBuildState((prev) => {
      const [cookie1, cookie2] = prev.cookieIds;

      return cookie1 === id
        ? {...prev, cookieIds: [null, cookie2]}
        : cookie2 === id
        ? {...prev, cookieIds: [cookie1, null]}
        : cookie1 === null
        ? {...prev, cookieIds: [id, cookie2]}
        : {...prev, cookieIds: [cookie1, id]};
    });
  };

  useEffect(() => {
    // 쿠키 레이어와 아이싱 레이어 preloading
    Object.values(CookieLayers).forEach((v) => {
      const img = new Image();
      img.src = v;
    });
    Object.values(IcingLayers).forEach((v) => {
      const img = new Image();
      img.src = v;
    });
  }, []);

  return (
    <>
      <SBuild.Title>{'쿠키하우스 지을 과자재료를\n선택해주세요!'}</SBuild.Title>
      <SBuild.Description>{'두 가지를 선택해주세요!'}</SBuild.Description>
      <S.GridBox>
        {CookiesImgs.map((image, idx) => (
          <DecorationButton
            key={idx}
            size={122}
            image={image}
            onClick={() => handleToggleSelect(idx + 1)}
            dark={buildState.cookieIds.includes(idx + 1)}
          />
        ))}
      </S.GridBox>
      <LongButton
        margin="20.5px 0 0 0"
        disabled={buildState.cookieIds.includes(null)}
        route="/build/custom/icing"
      >
        <SBuild.NextStepText>{'다 골랐어요!'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
