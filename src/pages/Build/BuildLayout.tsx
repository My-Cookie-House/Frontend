import {Outlet} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useEffect} from 'react';

export default function BuildLayout() {
  useEffect(() => {
    /**
     * TODO: 유저 정보 확인해서, 빌드를 한 적 있으면 접속 못하게 막기!
     * (집을 다시 만드는 것을 방지)
     */
  }, []);
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
