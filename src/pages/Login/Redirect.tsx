import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {Description, Wrapper} from './RedirectStyle';
import {useRecoilState} from 'recoil';
import {userInfoAtom, initialUserInfoState} from '../../atoms/loginStateAtom';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {login} from '@/apis/auth';
import {ILoginResponse} from '@/interfaces/auth';

export default function Redirect() {
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const state = Math.floor(Math.random() * 100).toString();
  const queryClient = useQueryClient();

  const kakaologin = async () => {
    try {
      const response: ILoginResponse = await login(code, state);
      if (response.accessToken === undefined) {
        console.log('엑세스 토큰을 못 받았어요');
      }

      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `${response.accessToken}`;
        return config;
      });

      await queryClient.invalidateQueries({queryKey: ['loginState']});
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUserInfo({
        ...initialUserInfoState,
        userId: response.userId,
        userName: response.userName,
        isHouseBuilt: response.isHouseBuilt,
        todayMissionComplete: response.todayMissionComplete,
      });
      navigate('/');
    } catch (e) {
      console.log('로그인 불가');
    }
  };

  useEffect(() => {
    kakaologin();
  }, []);

  return (
    <PageLayout>
      <Wrapper>
        <img src={CookieHouse}></img>
        <Description>1년의 기억들을 쿠키하우스에 담아봐요!</Description>
      </Wrapper>
    </PageLayout>
  );
}
