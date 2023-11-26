import {instance} from './axios';

export async function getLoginUserInfo() {
  try {
    const response: any = await instance.get('/user', {
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (err) {
    return null;
  }
}
