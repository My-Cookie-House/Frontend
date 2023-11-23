import {useSuspenseQuery} from '@tanstack/react-query';
import {IHouseOutside} from '../../../interfaces/house';
import house from '../../../apis/house';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {NextStepText} from '../../Build/style';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import Overlap from '../../../components/Overlap/Overlap';
import Cookies from '../../../assets/House/Outside/Cookies';
import Icings from '../../../assets/House/Outside/Icings';
import {useEffect} from 'react';
import InsideBg from '@/assets/House/Inside/InsideBg.png';
import GoOutModal from '@/components/Modal/GoOutModal/GoOutModal';
import {useState, useCallback} from 'react';
import useLogout from '@/hooks/useLogout';
import useSignout from '@/hooks/useSignout';

const STALE_MIN = 5;
const GC_MIN = 5;

export default function Outside() {
  const {id, isMyHouse} = useIsMyHouse();

  const {data} = useSuspenseQuery<IHouseOutside>({
    queryKey: ['house', 'outside', id],
    queryFn: () => house.getHouseOutside(+id),
    staleTime: 1000 * 60 * STALE_MIN,
    gcTime: 1000 * 60 * GC_MIN,
  });

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

  const logout = useLogout();
  const signout = useSignout();
  console.log('isMyHouse');
  console.log(isMyHouse);

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
            <button disabled={!isMyHouse} onClick={() => setlogoutModal(true)}>
              외출하기
            </button>
            <button disabled={!isMyHouse} onClick={() => setSignoutModal(true)}>
              철거하기
            </button>

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
