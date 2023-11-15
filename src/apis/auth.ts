import axios from 'axios';
import {LoginResponse} from '../type/type';

export default async function getUserInfo(code: string) {
  const response = await axios.post<LoginResponse>(
    `/api/auth/kakao/signin/callback?code=${code}`, //인가코드 보낼 url
  );
  return response.data;
}
