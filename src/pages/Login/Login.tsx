import PageLayout from '../../components/PageLayout/PageLayout';
import LoginText from '../../assets/LoginAssets/LoginText.svg';
import GoogleLogin from '../../assets/LoginAssets/GoogleLogin.svg';
import KakaoLogin from '../../assets/LoginAssets/KakaoLogin.png';
import whiteTree from '../../assets/LoginAssets/whiteTree.svg';

export default function Login() {
  return (
    <PageLayout>
      <img src={LoginText} />
      <img src={whiteTree} />
      <img src={KakaoLogin} />

      <img src={GoogleLogin} />
    </PageLayout>
  );
}
