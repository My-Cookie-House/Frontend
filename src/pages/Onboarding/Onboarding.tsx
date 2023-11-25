import PageLayout from '../../components/PageLayout/PageLayout';
import OnboardingSlider from '@/components/OnboardingComponents/OnboardingSlider';
import SkipButton from '@/components/Buttons/SkipButton/SkipButton';
import * as S from './style';
function OnboardingPage() {
  return (
    <PageLayout>
      <OnboardingSlider/>
      <S.SkipButtonWrapper>
        <SkipButton />
      </S.SkipButtonWrapper>
    </PageLayout>
  );
}

export default OnboardingPage;
