import axios from 'axios';
import {UserInfo} from '../atoms/loginAtom';

export default async function getUserInfo(
  code: string,
  provider: string,
  state: string,
): Promise<UserInfo> {
  const response = await axios.post<UserInfo>(
    `http://127.0.0.1:5173/auth/${provider}?code=${code}&state=${state}`,
  );
  return response.data;
}
