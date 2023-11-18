import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import {useRecoilValue} from 'recoil';
import {UserInfo} from '../../atoms/loginAtom';
import {loginStateAtom, userInfoAtom} from '../../atoms/loginStateAtom';

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();
  const user = useRecoilValue<UserInfo>(userInfoAtom);

  // 로그인 상태 가져오기
  const userId = user?.userId;
  const isHouseBuilt = user?.isHouseBuilt;

  const loggedIn = useRecoilValue(loginStateAtom);

  useEffect(() => {
    console.log(loggedIn, isHouseBuilt);
    const timer = setTimeout(() => {
      if (loggedIn) {
        if (isHouseBuilt) {
          navigate(`/${userId}`); // 로그인하였고 쿠키하우스를 지은 경우
        } else {
          navigate('/build'); // 로그인은 했지만 쿠키하우스를 지은 적이 없는 경우
        }
      } else {
        navigate('/login'); // 로그인하지 않은 경우
      }
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 취소
  }, [navigate, loggedIn, userId]);

  return (
    <PageLayout>
      <div>splash</div>
    </PageLayout>
  );
}
