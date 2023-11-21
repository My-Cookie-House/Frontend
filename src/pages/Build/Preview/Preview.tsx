import * as SBuild from '../style';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  BuildStateAtom,
  buildStateAtom,
  initalBuildState,
  sortedCookieIdsSelector,
} from '../../../atoms/buildAtom';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import Overlap from '../../../components/Overlap/Overlap';
import {useNavigate} from 'react-router-dom';
import Cookies from '../../../../public/assets/House/Outside/Cookies';
import Icings from '../../../../public/assets/House/Outside/Icings';

export default function Preview() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const [num1, num2] = useRecoilValue(sortedCookieIdsSelector);

  const navigate = useNavigate();

  const handleRebuild = () => {
    // buildState 초기화 시키기
    setBuildState(initalBuildState);
    navigate('/build');
  };
  return (
    <>
      <SBuild.Title marginTop="40px">
        {'나만의 쿠키하우스가 완성되었어요!\n입주하시겠어요?'}
      </SBuild.Title>
      <Overlap
        width={260}
        height={360}
        margin="30px 0 0 0"
        imgs={[
          Cookies[`Cookie${num1}${num2}`],
          Icings[`Icing${buildState.icingId}`],
        ]}
      />
      <LongButton margin="72px 0 0 0" route="/build/name">
        <SBuild.NextStepText>{'입주하기'}</SBuild.NextStepText>
      </LongButton>
      <LongButton margin="10px 0 0 0" onClick={handleRebuild}>
        <SBuild.NextStepText>{'집 다시 짓기'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
