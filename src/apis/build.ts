import {BuildStateAtom} from '../atoms/buildAtom';
import {instance} from './axios';

export const mutateHouse = (data: {
  icingId: number;
  cookieIds: number[];
  houseName: string;
}) => {
  return instance.post('/house', {
    data,
  });
};
