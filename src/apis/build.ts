import {IMutateHouse} from '@/interfaces/house';
import {instance} from './axios';
import {isAxiosError} from 'axios';
import {ApiError} from '@/Error/ApiError';
import * as Sentry from '@sentry/react';

export async function mutateHouse(data: IMutateHouse) {
  try {
    await instance.post('/house', {
      icingId: data.icingId,
      cookieIds: data.cookieIds,
      houseName: data.houseName,
      wallpaperId: data.wallpaperId,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw Sentry.captureException(new ApiError(error, 'mutateHouse'));
    }
  }
}
