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

  const state = '1';

  const kakaologin = async () => {
    try {
      const response = await instance.post(
        `/auth/kakao?code=${code}&state=${state}`,
      );
      console.log(response.data);
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
