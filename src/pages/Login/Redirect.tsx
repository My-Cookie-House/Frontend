import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import useSetTokens from '../../hooks/useSetTokens';
import {useEffect} from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {Description, Wrapper} from './RedirectStyle';

export default function Redirect() {
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');
  const navigate = useNavigate();
  let loginMethod = localStorage.getItem('loginMethod');
  loginMethod = loginMethod.replace(/"/g, ''); // 따옴표 제거
  localStorage.setItem('loginMethod', loginMethod); // 수정된 값으로 다시 로컬스토리지에 저장

  console.log(loginMethod);
  const state = Math.floor(Math.random() * 100);
  const loginUrl = `/auth/${loginMethod}?code=${code}&state=${state}`;
  console.log(loginUrl);

  const kakaologin = async () => {
    try {
      const response = await instance.get(loginUrl);
      console.log(response.data.accessToken);
      if (response.data.accessToken === undefined) {
        console.log('엑세스 토큰을 못 받았어요');
      }
      console.log('로그인 성공');
      navigate('/build');
      useSetTokens(response.data.accessToken, response.data.refreshToken);
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
