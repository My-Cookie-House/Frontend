import axios from 'axios';
import {UserInfo} from '../atoms/loginStateAtom';

export default async function getUserInfo(code: string): Promise<UserInfo> {
  const response = await axios.post<UserInfo>(
    `/api/auth/kakao/signin/callback?code=${code}`,
  );
  return response.data;
}
