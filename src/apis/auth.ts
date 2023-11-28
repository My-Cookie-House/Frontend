import {ApiError} from '@/Error/ApiError';
import {instance} from './axios';
import axios, {AxiosError} from 'axios';
import * as Sentry from '@sentry/react';

export async function getLoginUserInfo() {
  try {
    const response: any = await instance.get('/user', {
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      Sentry.captureException(new ApiError(err, 'getLoginUserInfo'));
    }
    return null;
  }
}
