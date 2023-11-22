import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
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
    </PageLayout>
  );
};

export default Login;
