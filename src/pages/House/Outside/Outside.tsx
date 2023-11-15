import {useSuspenseQuery} from '@tanstack/react-query';
import {IHouseOutside} from '../../../interfaces/house';
import house from '../../../apis/house';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {NextStepText} from '../../Build/style';
import useIsMyHouse from '../../../hooks/useIsMyHouse';
import Overlap from '../../../components/Overlap/Overlap';
import Cookies from '../../../assets/House/Outside/Cookies';

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

  const [num1, num2] = data.cookieIds;

  return (
    <>
      <Overlap
        width={300}
        height={400}
        margin="40px 0 0 0"
        // TODO: 배열 두 번째 값 실제 아이싱 데이터 반영해야함
        imgs={[Cookies[`Cookie${num1}${num2}`], Cookies.Cookie12]}
      />
      <LongButton margin="34px 0 0 0" route={`/${id}/inside`}>
        <NextStepText>
          {isMyHouse ? '집 안으로 들어가기' : '방문하기'}
        </NextStepText>
      </LongButton>
    </>
  );
}
