import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userIdAtom} from '../atoms/loginStateAtom';

export default function useIsMyHouse() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const userId = useRecoilValue(userIdAtom); // 로그인한 사람의 아이디
  const isMyHouse = id === userId; // 지금 위치가 나의 집인지?

  return {id, userId, isMyHouse};
}
