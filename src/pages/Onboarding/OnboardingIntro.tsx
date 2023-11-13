import PageLayout from '../../components/PageLayout/PageLayout';
import CookieHouse from '../../assets/OnboardingAssets/CookieHouse.svg';
import LongButton from '../../components/Buttons/LongButton/LongButton';

export default function OnboardingIntro() {
  return (
    <PageLayout>
      <p>'쿠키하우스에 오신 것을 환영해요!'</p>
      <CookieHouse />
      <LongButton>Start!</LongButton>
    </PageLayout>
  );
}
