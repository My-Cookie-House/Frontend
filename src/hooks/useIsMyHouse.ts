import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../atoms/loginStateAtom';

export default function useIsMyHouse() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const {userId} = useRecoilValue(userInfoAtom);
  const isMyHouse = Number(id) === userId; // 지금 위치가 나의 집인지?
  return {id, userId, isMyHouse};
}
