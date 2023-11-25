import * as S from './style';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {
  QueryErrorResetBoundary,
  useQuery,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query';
import house from '../../apis/house';
import {IHouseOutside} from '../../interfaces/house';
import useIsMyHouse from '../../hooks/useIsMyHouse';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '../../atoms/loginStateAtom';
import GuestBookButton from '@/components/Buttons/GuestBookButton/GuestBookButton';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Error from '../Error/Error';

const STALE_MIN = 5;

export default function House() {
  const {id, userId, isMyHouse} = useIsMyHouse();
  const {isHouseBuilt} = useRecoilValue(userInfoAtom);
  const {pathname} = useLocation();

  const navigate = useNavigate();

  const handleGuestBookClick = () => {
    navigate(`/${id}/guests`);
  };

  const {data, status, isError} = useQuery<IHouseOutside>({
    queryKey: ['house', 'outside', id],
    queryFn: async () => await house.getHouseOutside(+id),
    retry: 1,
  });

  console.log(status);
  console.log(data);
  console.log(isError);

  // Mission 모달을 여는 함수
  const handleOpenMissionModal = () => {
    // TODO: 이 쓸데없는 함수 없이 어떻게 깔끔하게 정리할 수 있을까..
  };

  // 방문한 쿠키하우스의 아이디와 현재 로그인한 유저의 아이디가 같은 경우만 미션 버튼 노출!
  return (
    <ErrorBoundary fallback={<Error />}>
      <PageLayout
        guestBook={`/${id}/guests`}
        mission={userId === +id ? handleOpenMissionModal : undefined}
        goBack={pathname === `/${id}/inside` && `/${id}`} // 하우스 내부에서만 뒤로가기 버튼 존재
      >
        <S.HouseName>{data?.houseName}</S.HouseName>
        <Outlet />
        <GuestBookButton onClick={handleGuestBookClick} />
      </PageLayout>
    </ErrorBoundary>
  );
}
