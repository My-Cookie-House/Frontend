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
  } catch (error) {
    if (axios.isAxiosError(error) && error.response.status !== 404) {
      Sentry.captureException(new ApiError(error, 'getLoginUserInfo'));
    }
    return null;
  }
}

export async function login(code: string, state: string) {
  try {
    const response = await instance.get(
      `/auth/kakao?code=${code}&state=${state}`,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Sentry.captureException(new ApiError(error, 'login'));
    }
  }
}
