import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageLayout from '@/components/PageLayout/PageLayout';
import {UserInfo, loginStateAtom} from '@/atoms/loginStateAtom';
import {useQueryClient} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';

export default function SplashScreen(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<null | UserInfo>(['loginState']);

  // 로그인 상태 가져오기
  const userId = user?.userId;
  const isHouseBuilt = user?.isHouseBuilt;
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
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 취소
  }, []);

  return (
    <PageLayout>
      <></>
    </PageLayout>
  );
}
