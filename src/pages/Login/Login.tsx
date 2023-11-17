import {QueryClientProvider, QueryClient} from 'react-query';
import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import whiteTree from '../../assets/LoginAssets/whiteTree.svg';
import {useRecoilState} from 'recoil';
import {loginMethodAtom} from '../../atoms/loginAtom';

const queryClient = new QueryClient();

const Login = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=profile_nickname`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile`;
  const [loginMethod, setLoginMethod] = useRecoilState(loginMethodAtom);

  const handleKakaoClick = (event) => {
    setLoginMethod('kakao');
  };

  const handleGoogleClick = (event) => {
    setLoginMethod('google');
  };

  return (
    <QueryClientProvider client={queryClient}>
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
          src={whiteTree}
          alt="White Tree"
          style={{
            width: '306px',
            height: '390px',
          }}
        />
        <a href={KAKAO_AUTH_URL}>
          <img
            src={KakaoLogin}
            alt="KakaoLogin"
            style={{
              width: '190px',
              height: '42px',
              marginTop: '31.27px',
              marginBottom: '8px',
            }}
            onClick={handleKakaoClick}
          />
        </a>
        <a href={GOOGLE_AUTH_URL}>
          <img
            src={GoogleLogin}
            alt="GoogleLogin"
            style={{
              width: '190px',
              height: '42px',
            }}
            onClick={handleGoogleClick}
          />
        </a>
      </PageLayout>
    </QueryClientProvider>
  );
};

export default Login;
