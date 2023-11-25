import Cookies from 'js-cookie';
import {instance} from './axios';

export async function getLoginUserInfo() {
  try {
    const response: any = await instance.get('/user', {
      headers: {
        Authorization: `${Cookies.get('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function signout(userId: number) {
  try {
    await instance.get(`/auth/unlink/${userId}`, {
      headers: {
        Authorization: `${Cookies.get('accessToken')}`,
      },
    });
  } catch (err) {
    throw new Error();
  }
}
