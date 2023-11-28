import {ApiError} from '@/Error/ApiError';
import {isAxiosError} from 'axios';
import {instance} from './axios';
import * as Sentry from '@sentry/react';

export default {
  getHouseOutside: async (userId: number) => {
    const response = await instance.get(`/house/${userId}`);
    try {
      return {
        ...response.data.data,
        cookieIds: response.data.data.cookieIds.sort((a, b) => a - b),
      };
    } catch (error) {
      if (isAxiosError(error)) {
        throw Sentry.captureException(new ApiError(error, 'getHouseOutside'));
      }
    }
  },
};
