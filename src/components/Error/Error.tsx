import PageLayout from '@/components/PageLayout/PageLayout';
import CryingGingerman from '@/assets/Error/CryingGingerman.webp';
import Img404 from '@/assets/Error/404.webp';
import {useNavigate} from 'react-router-dom';
import * as S from './style';
import LongButton from '@/components/Buttons/LongButton/LongButton';

export default function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <PageLayout>
      <S.GingermanImg src={CryingGingerman} />
      <S.ErrorText src={Img404} />
      <S.Title>부지를 찾을 수 없어요</S.Title>
      <S.Description>개발제한 구역이에요</S.Description>
      <LongButton margin="50px 0 0 0" onClick={handleClick}>
        <S.ButtonText>돌아가기</S.ButtonText>
      </LongButton>
    </PageLayout>
  );
}
