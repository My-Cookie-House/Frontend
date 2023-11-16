import {Outlet, useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {loginStateAtom} from '../../atoms/loginAtom';

export default function BuildLayout() {
  const {isHouseBuilt, userId} = useRecoilValue(loginStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * 유저 정보 확인해서, 빌드를 한 적 있으면 접속 못하게 막기!
     * (집을 다시 만드는 것을 방지)
     */
    if (isHouseBuilt) {
      alert('이미 쿠키하우스 빌딩이 완료되었습니다!');
      navigate(`/${userId}`);
    }
  }, [navigate, isHouseBuilt]);
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
