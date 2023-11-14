import {Outlet, useParams} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';

export default function House() {
  const {id} = useParams();
  return (
    <PageLayout guestBook="/id/guests" mission>
      <Outlet />
    </PageLayout>
  );
}
