import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userStateAtom} from '../atoms/loginAtom';

export default function useIsMyHouse() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const user = useRecoilValue(userStateAtom);
  const userId = user.data.userId; // 로그인한 사람의 아이디
  const isMyHouse = Number(id) === userId; // 지금 위치가 나의 집인지?

  return {id, userId, isMyHouse};
}
