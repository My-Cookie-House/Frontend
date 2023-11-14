import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {Suspense, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {IHouseOutside} from '../../../interfaces/house';
import house from '../../../apis/house';
import {useRecoilValue} from 'recoil';
import {loginStateAtom} from '../../../atoms/loginStateAtom';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {NextStepText} from '../../Build/style';

const STALE_MIN = 5;

export default function Outside() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const {userId} = useRecoilValue(loginStateAtom); // 로그인한 사람의 아이디

  const isMyHouse = useMemo(() => +id === userId, [id, userId]);
  console.log(id, userId, isMyHouse);
  const {data} = useSuspenseQuery<IHouseOutside>({
    queryKey: ['house', 'outside', id],
    queryFn: () => house.getHouseOutside(+id),
    staleTime: 1000 * 60 * STALE_MIN,
    gcTime: 1000 * 60 * STALE_MIN,
  });

  return (
    <>
      <img
        alt="쿠키하우스 외부"
        src=""
        style={{
          width: '295px',
          height: '364px',
          border: '1px solid black',
          marginTop: '43px',
        }}
      />
      <LongButton margin="34px 0 0 0" route={`/${id}/inside`}>
        <NextStepText>
          {isMyHouse ? '집 안으로 들어가기' : '방문하기'}
        </NextStepText>
      </LongButton>
    </>
  );
}
