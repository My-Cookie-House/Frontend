import {Outlet} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';

export default function BuildLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
