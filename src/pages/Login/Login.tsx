import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import WhiteTree from '@/assets/LoginAssets/WhiteTree.png';

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
          marginTop: '40.06px',
          marginBottom: '41.92px',
        }}
      />
      <img
        src={WhiteTree}
        alt="White Tree"
        style={{
          width: '311px',
          height: '395.5px',
        }}
      />
      <a href={KAKAO_AUTH_URL}>
        <img
          src={KakaoLogin}
          alt="KakaoLogin"
          style={{
            width: '190px',
            height: '42px',
            marginTop: '10px',
            marginBottom: '8px',
          }}
          onClick={handleKakaoClick}
        />
      </a>
    </PageLayout>
  );
};

export default Login;
