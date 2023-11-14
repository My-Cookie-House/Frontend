import * as S from './style';
import {Outlet, useLocation, useParams} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {loginStateAtom} from '../../atoms/loginStateAtom';
import {useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import house from '../../apis/house';
import {IHouseOutside} from '../../interfaces/house';
import {Suspense} from 'react';

const STALE_MIN = 5;

export default function House() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디
  const {userId} = useRecoilValue(loginStateAtom); // 로그인한 사람의 아이디
  const {pathname} = useLocation();

  const {data} = useQuery<IHouseOutside>({
    queryKey: ['house', 'outside', id],
    queryFn: () => house.getHouseOutside(+id),
    staleTime: 1000 * 60 * STALE_MIN,
    gcTime: 1000 * 60 * STALE_MIN,
  });

  // 방문한 쿠키하우스의 아이디와 현재 로그인한 유저의 아이디가 같은 경우만 미션 버튼 노출!
  return (
    <PageLayout
      guestBook={`/${id}/guests`}
      mission={userId === +id}
      goBack={pathname === `/${id}/inside` && `/${id}`} // 하우스 내부에서만 뒤로가기 버튼 존재
    >
      <S.HouseName>{data?.houseName}</S.HouseName>
      <Suspense>
        <Outlet />
      </Suspense>
    </PageLayout>
  );
}
