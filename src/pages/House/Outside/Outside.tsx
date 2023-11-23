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
import GoOutButton from '@/components/Buttons/GoOutButton/GoOutButton';

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
      {isMyHouse ? <GoOutButton /> : ''}
    </>
  );
}
