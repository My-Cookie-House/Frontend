import {QueryClientProvider, QueryClient} from 'react-query';
import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import whiteTree from '../../assets/LoginAssets/whiteTree.svg';
import useLogin from '../../hooks/useLogin';
import {useRecoilState} from 'recoil';
import {loginMethodAtom} from '../../atoms/loginAtom';

const queryClient = new QueryClient();

export default function Login() {
  const [loginMethod, setLoginMethod] = useRecoilState(loginMethodAtom);

  function handleKakaoLogin() {
    setLoginMethod('kakao');
    useLogin();
  }

  function handleGoogleLogin() {
    setLoginMethod('google');
    useLogin();
  }

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
      </PageLayout>
    </QueryClientProvider>
  );
}
