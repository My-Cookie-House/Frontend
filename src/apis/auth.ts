import Cookie from 'js-cookie';
export async function getLoginUserInfo() {
  try {
    const response: any = await instance.get('/user', {
      headers: {
        Authorization: Cookie.get('accessToken'),
      },
    });
    return response.data.data;
  } catch (err) {
    return null;
  }
}

import axios from 'axios';
import {Data} from '../atoms/loginAtom';
import {instance} from './axios';
import Cookies from '@/pages/Build/Custom/Cookies/Cookies';

export default async function tryLogin(
  code: string,
  state: string,
): Promise<Data> {
  const response = await axios.post<Data>(
    `https://15.165.156.94/auth/kakao?code=${code}&state=${state}`,
  );
  return response.data;
}
