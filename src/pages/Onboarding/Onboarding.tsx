import PageLayout from '../../components/PageLayout/PageLayout';
import OnboardingSlider from '@/components/OnboardingComponents/OnboardingSlider';
import SkipButton from '@/components/Buttons/SkipButton/SkipButton';
function OnboardingPage() {
  return (
    <PageLayout>
      <OnboardingSlider/>
      <SkipButton />
    </PageLayout>
  );
}

export default OnboardingPage;
