import {useMutation} from '@tanstack/react-query';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import useInput from '../../../hooks/useInput';
import * as SBuild from '../style';
import * as S from './style';
import {
  BuildStateAtom,
  buildStateAtom,
  initalBuildState,
} from '../../../atoms/buildAtom';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';

const MAX_LENGTH = 10;

/**
 * 아래는 예제 코드
 * TODO: 실제 api 호출함수로 변경해야함
 */
const mutateHouse = (data: Omit<BuildStateAtom, 'type'>) =>
  new Promise((res) => {
    res('success');
  });

export default function Name() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);
  const name = useInput<HTMLInputElement>();

  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: () =>
      mutateHouse({
        icingId: buildState.icingId,
        cookieIds: buildState.cookieIds,
        name: name.value,
      }),
    onSuccess: () => {
      /**
       * TODO: 유저 아이디 가져와서 아이디에 맞는 path로 이동
       */
      navigate('/:id');
    },
  });

  // buildState 데이터들이 유효한지(null 값이 없는지) 체크
  const isValid = () => {
    if (buildState.cookieIds.includes(null) || buildState.icingId === null) {
      // null 값이 포함 된 경우
      alert('건너뛴 단계가 존재합니다.\n처음부터 다시 시작합니다.');
      setBuildState(initalBuildState);
      navigate('/build');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    // 서버에 빌드 완료한 쿠키 하우스 데이터 전송
    if (isValid()) mutate();
  };

  return (
    <>
      <SBuild.Title>{'쿠키하우스의 이름을 지어주세요!'}</SBuild.Title>
      <S.Input
        maxLength={MAX_LENGTH}
        value={name.value}
        onChange={name.handleChange}
        spellCheck={false}
        placeholder={'이름을 입력해주세요'}
      />
      {/**
       * TODO: 미리보기 이미지 추가
       */}
      <img
        alt="쿠키하우스 외관 미리보기"
        src=""
        style={{
          marginTop: '58.89px',
          width: '236px',
          height: '291px',
          border: '1px solid black',
        }}
      />
      <LongButton
        margin="38px 0 0 0"
        onClick={handleSubmit}
        disabled={name.value.length === 0}
        type="submit"
      >
        <SBuild.NextStepText>{'입력 완료'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
