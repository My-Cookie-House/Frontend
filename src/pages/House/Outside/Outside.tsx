import {useSuspenseQuery} from '@tanstack/react-query';
import house from '../../../apis/house';
import {useParams} from 'react-router-dom';

export default function Outside() {
  const {id} = useParams(); // 현재 접속한 쿠키하우스 주인의 아이디

  return <>outside</>;
}
