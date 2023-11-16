import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import whiteTree from '../../assets/LoginAssets/whiteTree.svg';
import useLogin from '../../hooks/useLogin';
import {useRecoilState} from 'recoil';
import {loginMethodAtom} from '../../atoms/loginAtom';

export default function Login() {
  const [loginMethod, setLoginMethod] = useRecoilState(loginMethodAtom);

  const handleKakaoLogin = () => {
    setLoginMethod('kakao');
    useLogin();
  };

  const handleGoogleLogin = () => {
    setLoginMethod('google');
    useLogin();
  };

  return (
    <PageLayout>
      <img src={LoginText} />
      <img src={whiteTree} />
      <img
        src={KakaoLogin}
        alt="KakaoLogin"
        style={{width: '240.845px', height: '53.239px'}}
        onClick={handleKakaoLogin}
      />
      <img src={GoogleLogin} onClick={handleGoogleLogin} />
    </PageLayout>
  );
}
