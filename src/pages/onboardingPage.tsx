import Slider from '../utils/slider';
import React from 'react';
import Image1 from '../assets/onboardingAssets/onboarding1.svg';
import Image2 from '../assets/onboardingAssets/onboarding2.svg';
import Image3 from '../assets/onboardingAssets/onboarding3.svg';

import Progress1 from '../assets/onboardingAssets/progress1.svg';
import Progress2 from '../assets/onboardingAssets/progress2.svg';
import Progress3 from '../assets/onboardingAssets/progress3.svg';

function OnboardingPage() {
  const images = [Image1, Image2, Image3];

  const topTexts = [
    '미션으로 일년의 추억을 회고해요!',
    '나만의 집을 꾸며보세요!',
    '친구를 초대해 보세요!',
  ];
  const bottomTexts = [
    <>
      <p>매일 미션이 도착해요!</p>
      <p>미션에 맞는 추억의 사진을 찾아 포스팅하면</p>
      <p> 미션 클리어!</p>
    </>,
    <>
      <p>미션을 완성하면, 가구를 받을 수 있어요!</p>
      <p>가구로 나만의 쿠키하우스를 꾸며봐요!</p>
    </>,
    <>
      <p>친구를 쿠키하우스에 초대해서</p>
      <p>나의 추억을 같이 공유해보세요!</p>
    </>,
  ];

  const extraTexts = [
    '(미션은 다음날이 지나면, 완수할 수 없으니 주의!)',
    '',
    '',
  ];
  const progresses = [Progress1, Progress2, Progress3];
  return (
    <div>
      <Slider
        topTexts={topTexts}
        images={images}
        bottomTexts={bottomTexts}
        extraTexts={extraTexts}
        progresses={progresses}
      />
    </div>
  );
}

export default OnboardingPage;
