import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageLayout from '@/components/PageLayout/PageLayout';
import {userInfoAtom, loginStateAtom} from '@/atoms/loginStateAtom';
import {useRecoilValue} from 'recoil';

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();
  const {isHouseBuilt, userId} = useRecoilValue(userInfoAtom);
  const loggedIn = useRecoilValue(loginStateAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loggedIn) {
        if (isHouseBuilt) {
          navigate(`/${userId}`); // 로그인하였고 쿠키하우스를 지은 경우
        } else {
          navigate('/onboarding'); // 로그인은 했지만 쿠키하우스를 지은 적이 없는 경우(온보딩->빌딩)
        }
      } else {
        navigate('/login'); // 로그인하지 않은 경우
      }
    }, 1700);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 취소
  }, [loggedIn, isHouseBuilt]);

  return (
    <PageLayout>
      <></>
    </PageLayout>
  );
}
