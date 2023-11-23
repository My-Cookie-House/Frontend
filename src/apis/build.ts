import {BuildStateAtom} from '../atoms/buildAtom';
import {instance} from './axios';

export const mutateHouse = (data: {
  icingId: number;
  cookieIds: number[];
  houseName: string;
  wallpaperId: number;
}) => {
  return instance.post('/house', {
    icingId: data.icingId,
    cookieIds: data.cookieIds,
    houseName: data.houseName,
    wallpaperId: data.wallpaperId,
  });
};
