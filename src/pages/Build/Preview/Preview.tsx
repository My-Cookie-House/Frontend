import * as SBuild from '../style';
import {useSetRecoilState} from 'recoil';
import {
  BuildStateAtom,
  buildStateAtom,
  initalBuildState,
} from '../../../atoms/buildAtom';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {useNavigate} from 'react-router-dom';

export default function Preview() {
  const setBuildState = useSetRecoilState<BuildStateAtom>(buildStateAtom);

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
      {/**
       * TODO: 미리보기 이미지 넣기!
       */}
      <img
        alt="쿠키하우스 외관 미리보기"
        src=""
        style={{
          marginTop: '58.89px',
          width: '278px',
          height: '343px',
          border: '1px solid black',
        }}
      />
      <LongButton margin="72px 0 0 0" route="/build/name">
        <SBuild.NextStepText>{'입주하기'}</SBuild.NextStepText>
      </LongButton>
      <LongButton margin="10px 0 0 0" onClick={handleRebuild}>
        <SBuild.NextStepText>{'집 다시  짓기'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
