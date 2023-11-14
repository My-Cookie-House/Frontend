import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 취소
  }, [navigate]);

  return (
    <PageLayout>
      <div>splash</div>
    </PageLayout>
  );
}
