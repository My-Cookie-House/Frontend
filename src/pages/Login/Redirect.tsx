import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {Description, Wrapper} from './RedirectStyle';
import {useRecoilState} from 'recoil';
import {userInfoAtom, initialUserInfoState} from '../../atoms/loginStateAtom';
import {useQueryClient} from '@tanstack/react-query';

export default function Redirect() {
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const state = Math.floor(Math.random() * 100);
  const loginUrl = `/auth/kakao?code=${code}&state=${state}`;
  const queryClient = useQueryClient();

  const kakaologin = async () => {
    try {
      const response = await instance.get(loginUrl);
      if (response.data.data.accessToken === undefined) {
        console.log('엑세스 토큰을 못 받았어요');
      }

      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `${response.data.data.accessToken}`;
        return config;
      });
      await queryClient.invalidateQueries({queryKey: ['loginState']});
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      setUserInfo({
        ...initialUserInfoState,
        userId: response.data.data.userId,
        userName: response.data.data.userName,
        isHouseBuilt: response.data.data.isHouseBuilt,
        todayMissionComplete: response.data.data.todayMissionComplete,
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
