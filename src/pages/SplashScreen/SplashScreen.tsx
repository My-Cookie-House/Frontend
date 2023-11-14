import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useRecoilValue} from 'recoil';
import {LoginState, loginStateAtom} from '../../atoms/loginStateAtom';

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();

  // 로그인 상태 가져오기
  const {loggedIn, userId, isHouseBuilt} =
    useRecoilValue<LoginState>(loginStateAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loggedIn) navigate(`/${userId}`);
      if (isHouseBuilt === false) navigate('/build');
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
