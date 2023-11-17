// 아래는 모킹 함수

import {instance} from './axios';

// TODO: 실제 api로 함수 바꿔야 함
export default {
  getHouseOutside: async (userId: number) => {
    const response = await instance.get(`/house/${userId}`);
    return {
      ...response.data.data,
      cookieIds: response.data.data.cookieIds.sort((a, b) => a - b),
    };
  },
};
