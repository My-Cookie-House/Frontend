import * as S from './style';
import * as SBuild from '../style';
import PageLayout from '../../../components/PageLayout/PageLayout';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {useEffect, useState} from 'react';

export default function Random() {
  const [isConstructing, setIsConstructing] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsConstructing(false), 1500);
  }, []);

  return (
    <PageLayout>
      <SBuild.Title>랜덤 쿠키하우스를 선택했어요!</SBuild.Title>
      <SBuild.Description>
        {isConstructing
          ? '공사중이니 조금만 기다려주세요!'
          : '쿠키하우스가 완성되었어요!'}
      </SBuild.Description>
      {/**
       * TODO: 공사 중, 공사 완료 일러스트 이미지 추가
       */}
      <S.Image
        alt={isConstructing ? '공사중 일러스트' : '공사완료 일러스트'}
        src=""
      />
      <LongButton dark={isConstructing} route="/build/preview">
        <SBuild.NextStepText>
          {isConstructing ? '쿠키하우스 공사중' : '집 보러가기'}
        </SBuild.NextStepText>
      </LongButton>
    </PageLayout>
  );
}
