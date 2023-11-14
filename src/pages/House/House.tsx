import {Outlet, useParams} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {loginStateAtom} from '../../atoms/loginStateAtom';
import {useRecoilValue} from 'recoil';

export default function House() {
  const {id} = useParams();
  const {userId} = useRecoilValue(loginStateAtom);
  console.log(id, userId);

  return (
    // 방문한 쿠키하우스의 아이디와 현재 로그인한 유저의 아이디가 같은 경우만 미션 버튼 노출!
    <PageLayout guestBook={`/${id}/guests`} mission={userId === +id}>
      <Outlet />
    </PageLayout>
  );
}
