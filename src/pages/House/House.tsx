import {Outlet} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import useAuth from '../../hooks/useAuth';
import {ILoginUser} from '../../interfaces/auth';

export default function House() {
  const user: null | ILoginUser = useAuth();
  return (
    <PageLayout mission guestBook>
      <Outlet />
    </PageLayout>
  );
}
