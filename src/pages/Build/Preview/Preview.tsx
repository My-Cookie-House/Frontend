import {useRecoilValue} from 'recoil';
import PageLayout from '../../../components/PageLayout/PageLayout';
import {buildStateAtom} from '../../../atoms/buildAtom';

export default function Preview() {
  const buildState = useRecoilValue(buildStateAtom);
  console.log(buildState);
  return <PageLayout>프리뷰!</PageLayout>;
}
