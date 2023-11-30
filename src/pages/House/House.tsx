import * as S from './style';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useQuery} from '@tanstack/react-query';
import house from '../../apis/house';
import {IHouseOutside} from '../../interfaces/house';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import GuestBookButton from '@/components/Buttons/GuestBookButton/GuestBookButton';
import * as Sentry from '@sentry/react';
import Error from '@/components/Error/Error';
import NameTag from '@/components/NameTag/NameTag';

const STALE_MIN = 5;

export default function House() {
  const {id, userId, isMyHouse} = useIsMyHouse();
  const {pathname} = useLocation();

  const navigate = useNavigate();

  const handleGuestBookClick = () => {
    navigate(`/${id}/guests`);
  };

  const {data} = useQuery<IHouseOutside>({
    queryKey: ['house', 'outside', id],
    queryFn: () => house.getHouseOutside(id),
    staleTime: 1000 * 60 * STALE_MIN,
    gcTime: 1000 * 60 * STALE_MIN,
    retry: 1,
  });

  // 방문한 쿠키하우스의 아이디와 현재 로그인한 유저의 아이디가 같은 경우만 미션 버튼 노출!
  return (
    <Sentry.ErrorBoundary fallback={<Error />}>
      <PageLayout
        mission={userId === +id}
        goBack={pathname === `/${id}/inside` && `/${id}`} // 하우스 내부에서만 뒤로가기 버튼 존재
      >
        <NameTag name={data?.houseName} />
        <Outlet />
        <GuestBookButton onClick={handleGuestBookClick} />
      </PageLayout>
    </Sentry.ErrorBoundary>
  );
}
