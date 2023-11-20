import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import useSetTokens from '../../hooks/useSetTokens';
import {useEffect} from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {Description, Wrapper} from './RedirectStyle';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {loginStateAtom, userInfoAtom} from '../../atoms/loginStateAtom';
import {flushSync} from 'react-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {useQueryClient} from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';

export default function Redirect() {
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);
  const state = Math.floor(Math.random() * 100);
  const loginUrl = `/auth/kakao?code=${code}&state=${state}`;
  const queryClient = useQueryClient();
  useAuth();

  const kakaologin = async () => {
    try {
      const response = await instance.get(loginUrl);
      console.log(response);
      console.log(response.data.data.accessToken);
      if (response.data.data.accessToken === undefined) {
        console.log('엑세스 토큰을 못 받았어요');
      }

      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `${response.data.data.accessToken}`;
        return config;
      });
      await queryClient.invalidateQueries({queryKey: ['loginState']});
      Cookies.set('accessToken', response.data.data.accessToken);
      Cookies.set('refreshToken', response.data.data.refreshToken);
      setLoginState(true);
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
