import axios from 'axios';
import {Data} from '../atoms/loginAtom';

export default async function tryLogin(
  code: string,
  state: string,
): Promise<Data> {
  const response = await axios.post<Data>(
    `http://127.0.0.1:5173/auth/kakao?code=${code}&state=${state}`,
  );
  return response.data;
}
