import * as S from './style';
import PageLayout from '../../components/PageLayout/PageLayout';
import BuildTypeButton from '../../components/Buttons/BuildTypeButton/BuildTypeButton';
import LongButton from '../../components/Buttons/LongButton/LongButton';
import {useCallback, useState} from 'react';

type BuildType = 'unselected' | 'random' | 'custom';

export default function Build() {
  const [buildType, setBuildType] = useState<BuildType>('unselected');

  const handleRandomSelect = useCallback(
    () => setBuildType((prev) => (prev === 'random' ? 'unselected' : 'random')),
    [],
  );
  const handleCustomSelect = useCallback(
    () => setBuildType((prev) => (prev === 'custom' ? 'unselected' : 'custom')),
    [],
  );

  return (
    <PageLayout>
      <S.Title>쿠키하우스 입주하기</S.Title>
      <S.Description>하나를 선택해주세요!</S.Description>
      <BuildTypeButton
        onClick={handleRandomSelect}
        margin="19.68px 0 0 0"
        title="랜덤으로 분양받을래요!"
        description={'랜덤으로 커스텀된 쿠키하우스에\n입주하게 됩니다'}
        dark={buildType === 'random'}
      />
      <BuildTypeButton
        onClick={handleCustomSelect}
        margin="22px 0 0 0"
        title="제가 직접 지을래요!"
        description={'과자를 선택해 쿠키하우스를 커스텀하고\n입주하게 됩니다'}
        dark={buildType === 'custom'}
      />
      <LongButton
        route={`/build/${buildType}`}
        margin="84px 0 0 0"
        disabled={buildType === 'unselected'}
      >
        <S.NextStepText>집 보러가기</S.NextStepText>
      </LongButton>
    </PageLayout>
  );
}
