import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import useSetTokens from '../../hooks/useSetTokens';
import {useEffect} from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import {Description, Wrapper} from './RedirectStyle';
import {useRecoilState} from 'recoil';
import {loginMethodAtom} from '../../atoms/loginAtom';
import {useQueryClient} from 'react-query';

export default function Redirect() {
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');
  const navigate = useNavigate();
  const loginMethod = useRecoilState(loginMethodAtom);
  const state = Math.floor(Math.random() * 100);
  const loginUrl = `/auth/${loginMethod[0]}?code=${code}&state=${state}`;

  const queryClient = useQueryClient();

  const kakaologin = async () => {
    try {
      const response = await instance.get(loginUrl);
      console.log(response.data.accessToken);
      if (response.data.accessToken === undefined) {
        console.log('엑세스 토큰을 못 받았어요');
      }
      navigate('/build');
      useSetTokens(response.data.accessToken, response.data.refreshToken);
      await queryClient.invalidateQueries(['loginState']);
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
