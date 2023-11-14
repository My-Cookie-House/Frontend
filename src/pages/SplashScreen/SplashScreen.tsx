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
    console.log(loggedIn, isHouseBuilt);
    const timer = setTimeout(() => {
      if (loggedIn && isHouseBuilt === false)
        navigate(
          '/build',
        ); // 로그인은 했지만 쿠키하우스를 빌드한 적이 없는 경우
      else if (loggedIn) navigate(`/${userId}`);
      else navigate('/login');
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 취소
  }, [navigate, loggedIn, userId]);

  return (
    <PageLayout>
      <div>splash</div>
    </PageLayout>
  );
}
