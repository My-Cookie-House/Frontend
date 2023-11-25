import * as S from './style';
import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.webp';
import WhiteTree from '@/assets/LoginAssets/WhiteTree.webp';

const Login = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=profile_nickname`;

  const handleKakaoClick = () => {
    localStorage.setItem('loginMethod', JSON.stringify('kakao'));
  };

  return (
    <PageLayout>
      <img
        src={LoginText}
        alt="Login"
        style={{
          width: '80px',
          height: '19px',
          marginTop: '43px',
          marginBottom: '30px',
        }}
      />
      <img
        src={WhiteTree}
        alt="White Tree"
        style={{
          width: '328px',
          height: '439px',
        }}
      />
      <a href={KAKAO_AUTH_URL}>
        <img
          src={KakaoLogin}
          alt="KakaoLogin"
          style={{
            width: '190px',
            height: '42px',
            marginTop: '70px',
            marginBottom: '10px',
          }}
          onClick={handleKakaoClick}
        />
      </a>
      <S.LoginTerms
        href="https://glittery-slayer-60c.notion.site/aeb021139728445598bef71160a07222"
        target="_blank"
      >
        서비스 이용약관
      </S.LoginTerms>
    </PageLayout>
  );
};

export default Login;
