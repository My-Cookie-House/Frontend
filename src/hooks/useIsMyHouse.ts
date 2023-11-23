import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../atoms/loginStateAtom';
import {useMemo} from 'react'; // useMemo import

export default function useIsMyHouse() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const {userId} = useRecoilValue(userInfoAtom);
  const isMyHouse = useMemo(() => Number(id) === userId, [id, userId]);

  return {id, userId, isMyHouse};
}
