import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {IHouseOutside} from '../../../interfaces/house';
import house from '../../../apis/house';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {NextStepText} from '../../Build/style';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import Overlap from '../../../components/Overlap/Overlap';
import Cookies from '../../../assets/House/Outside/Cookies';
import Icings from '../../../assets/House/Outside/Icings';
import {useEffect} from 'react';
import InsideBg from '@/assets/House/Inside/InsideBg.webp';
import GoOutModal from '@/components/Modal/GoOutModal/GoOutModal';
import {useState, useCallback} from 'react';
import useGoOut from '@/hooks/useGoOut';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const STALE_MIN = 5;
const GC_MIN = 5;

export default function Outside() {
  const {id, isMyHouse} = useIsMyHouse();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<IHouseOutside>([
    'house',
    'outside',
    id,
  ]);
  // const {data, isError, isFetched} = useSuspenseQuery<IHouseOutside>({
  //   queryKey: ['house', 'outside', id],
  //   queryFn: () => house.getHouseOutside(+id),
  //   staleTime: 1000 * 60 * STALE_MIN,
  //   gcTime: 1000 * 60 * GC_MIN,
  // });

  const loadImage = async (src: string) =>
    await new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(src);
      };
      img.onerror = (e) => {
        reject(e);
      };
    });

  const [num1, num2] = data.cookieIds;

  useEffect(() => {
    // 하우스 내부 배경 이미지 preload
    loadImage(InsideBg);
  }, []);

  const [logoutModal, setlogoutModal] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);

  const closeLogout = useCallback(() => {
    setlogoutModal(false);
  }, []);

  const closeSignout = useCallback(() => {
    setSignoutModal(false);
  }, []);

  const {logout, signout} = useGoOut('/auth/sign-out');
  return (
    <>
      <Overlap
        width={330}
        height={455}
        margin="40px 0 0 0"
        imgs={[
          Cookies[`LgCookie${num1}${num2}`],
          Icings[`LgIcing${data.icingId}`],
        ]}
      />
      <LongButton margin="34px 0 0 0" route={`/${id}/inside`}>
        <NextStepText>
          {isMyHouse ? '집 안으로 들어가기' : '방문하기'}
        </NextStepText>
      </LongButton>
      <>
        {isMyHouse && (
          <>
            <ButtonContainer>
              <Button
                disabled={!isMyHouse}
                onClick={() => setlogoutModal(true)}
              >
                외출하기
              </Button>
              <P>|</P>
              <Button
                disabled={!isMyHouse}
                onClick={() => setSignoutModal(true)}
              >
                철거하기
              </Button>
            </ButtonContainer>
            <div>
              <GoOutModal
                isOpen={logoutModal}
                closeModal={closeLogout}
                modalTitle={'외출하기'}
                modalTexts={[
                  '외출하기를 누르시면',
                  '로그아웃이 됩니다.',
                  '로그아웃 하시겠습니까?',
                ]}
                yesBtnText={'예'}
                onYes={logout}
              />
              <GoOutModal
                isOpen={signoutModal}
                closeModal={closeSignout}
                modalTitle={'철거하기'}
                modalTexts={[
                  '철거하기를 누르시면',
                  '회원 탈퇴가 됩니다.',
                  '모든 데이터가 삭제되고',
                  '새로운 집을 만들 수 있습니다',
                ]}
                yesBtnText={'탈퇴하기'}
                onYes={signout}
              />
            </div>
          </>
        )}
      </>
    </>
  );
}

const Button = styled.button`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  background: none;
  cursor: pointer;
  margin-top: 14.07px;
`;

const P = styled.p`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 14.07px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
