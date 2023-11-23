import {useMutation} from '@tanstack/react-query';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import useInput from '../../../hooks/useInput';
import * as SBuild from '../style';
import * as S from './style';
import {
  BuildStateAtom,
  buildStateAtom,
  initalBuildState,
  sortedCookieIdsSelector,
} from '../../../atoms/buildAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {useMemo} from 'react';
import Overlap from '../../../components/Overlap/Overlap';
import Cookies from '../../../assets/House/Outside/Cookies';
import Icings from '../../../assets/House/Outside/Icings';
import {instance} from '../../../apis/axios';
import {mutateHouse} from '../../../apis/build';
import {userInfoAtom} from '../../../atoms/loginStateAtom';

const MAX_LENGTH = 10;

export default function Name() {
  const {userId} = useRecoilValue(userInfoAtom);
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);
  const [num1, num2] = useRecoilValue(sortedCookieIdsSelector);

  const name = useInput<HTMLInputElement>();

  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: () =>
      mutateHouse({
        icingId: buildState.icingId,
        cookieIds: buildState.cookieIds,
        houseName: name.value,
        wallpaperId: buildState.wallpaperId,
      }),
    onSuccess: () => {
      navigate(`/${userId}`);
    },
  });

  // buildState 데이터들이 유효한지(null 값이 없는지) 체크
  const isValid = useMemo(() => {
    if (buildState.cookieIds.includes(null) || buildState.icingId === null) {
      // null 값이 포함 된 경우
      alert('건너뛴 단계가 존재합니다.\n처음부터 다시 시작합니다.');
      setBuildState(initalBuildState);
      navigate('/build');
      return false;
    }
    return true;
  }, [buildState, navigate, setBuildState]);

  const handleSubmit = () => {
    // 서버에 빌드 완료한 쿠키 하우스 데이터 전송
    if (isValid) mutate();
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
      <Overlap
        width={300}
        height={414}
        margin="30px 0 0 0"
        imgs={[
          Cookies[`Cookie${num1}${num2}`],
          Icings[`Icing${buildState.icingId}`],
        ]}
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
