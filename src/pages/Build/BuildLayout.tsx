import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useEffect, useLayoutEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {loginStateAtom} from '../../atoms/loginStateAtom';
import {BuildStateAtom, buildStateAtom} from '../../atoms/buildAtom';

const ICING_PATH = '/build/custom/icing';
const PREVIEW_PATH = '/build/preview';

export default function BuildLayout() {
  const {isHouseBuilt, userId, loggedIn} = useRecoilValue(loginStateAtom);
  const {cookieIds, icingId, name} =
    useRecoilValue<BuildStateAtom>(buildStateAtom);

  const navigate = useNavigate();
  const {pathname} = useLocation();

  const redirect = () => {
    alert('건너뛴 이전 단계가 존재합니다. 다시 처음부터 빌딩해주세요.');
    navigate('/build');
  };

  useEffect(() => {
    /**
     * 유저 정보 확인해서, 빌드를 한 적 있으면 접속 못하게 막기!
     * (집을 다시 만드는 것을 방지)
     */
    if (!loggedIn) {
      alert('로그인 해주세요');
      navigate('/login');
    }
    if (isHouseBuilt) {
      alert('이미 입주하신 쿠키하우스가 존재합니다!');
      navigate(`/${userId}`);
    }
  }, [navigate, isHouseBuilt, loggedIn]);

  useEffect(() => {
    /**
     * 앞선 단계에 대한 데이터가 없으면 첫 빌드화면으로 보내기
     */
    if (pathname === ICING_PATH && cookieIds.includes(null)) {
      // 아이싱 선택 단계에서 쿠키가 선택되지 않은 경우
      return redirect();
    }
    if (
      pathname === PREVIEW_PATH &&
      (cookieIds.includes(null) || icingId === null)
    ) {
      // 미리보기 단계에서 쿠키나 아이싱을 선택하지 않은 경우
      return redirect();
    }
  }, [pathname, navigate]);
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
