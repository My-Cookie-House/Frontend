import {QueryClientProvider, QueryClient} from 'react-query';
import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import whiteTree from '../../assets/LoginAssets/whiteTree.svg';
import UseLogin from '../../hooks/useLogin';
import {useState} from 'react';

const queryClient = new QueryClient();

const Login = () => {
  const [kakaoLoginClicked, setKakaoLoginClicked] = useState(false);
  const [googleLoginClicked, setGoogleLoginClicked] = useState(false);

  const handleKakaoLogin = () => {
    setKakaoLoginClicked(true);
    setGoogleLoginClicked(false);
  };

  const handleGoogleLogin = () => {
    setKakaoLoginClicked(false);
    setGoogleLoginClicked(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <img src={LoginText} alt="Login" />
        <img src={whiteTree} alt="White Tree" />
        <img
          src={KakaoLogin}
          alt="KakaoLogin"
          style={{width: '240.845px', height: '53.239px'}}
          onClick={handleKakaoLogin}
        />
        <img src={GoogleLogin} alt="GoogleLogin" onClick={handleGoogleLogin} />

        {kakaoLoginClicked && <UseLogin provider="kakao" />}
        {googleLoginClicked && <UseLogin provider="google" />}
      </PageLayout>
    </QueryClientProvider>
  );
};

export default Login;
