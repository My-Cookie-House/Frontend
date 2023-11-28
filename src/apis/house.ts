import {ApiError} from '@/Error/ApiError';
import {isAxiosError} from 'axios';
import {instance} from './axios';
import * as Sentry from '@sentry/react';

export default {
  getHouseOutside: async (userId: string) => {
    try {
      const response = await instance.get(`/house/${userId}`);
      return {
        ...response.data.data,
        cookieIds: response.data.data.cookieIds.sort(
          (a: number, b: number) => a - b,
        ),
      };
    } catch (error) {
      if (isAxiosError(error)) {
        // 400 이나 500인 경우는 단순히 잘못된 경로로 이동한 경우이기 때문에 warning level로 설정
        if (error.response.status === 404 || error.response.status === 500) {
          Sentry.withScope((scope) => {
            scope.setLevel('warning');
            throw Sentry.captureException(
              new ApiError(error, 'getHouseOutside'),
            );
          });
        }
        throw Sentry.captureException(new ApiError(error, 'getHouseOutside'));
      }
    }
  },
};
