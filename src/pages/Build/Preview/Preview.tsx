import {useRecoilValue} from 'recoil';
import PageLayout from '../../../components/PageLayout/PageLayout';
import {buildStateAtom} from '../../../atoms/buildAtom';
import DecorationButton from '../../../components/Buttons/DecorationButton/DecorationButton';
import Example from '../../../assets/Ornament/Ornament2.svg';

export default function Preview() {
  const buildState = useRecoilValue(buildStateAtom);
  console.log(buildState);
  return (
    <PageLayout>
      프리뷰!
      <DecorationButton size={84} image={Example} />
    </PageLayout>
  );
}
