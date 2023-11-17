import {instance} from '../../apis/axios';
import {useNavigate} from 'react-router-dom';
import useSetTokens from '../../hooks/useSetTokens';
import {useEffect} from 'react';

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
      useSetTokens(response.data.accessToken, response.data.refreshToken);
    } catch (e) {
      console.log('로그인 불가');
    }
  };

  useEffect(() => {
    kakaologin();
  }, []);

  return <>로그인 중</>;
}
