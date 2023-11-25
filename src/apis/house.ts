import {instance} from './axios';

export default {
  getHouseOutside: async (userId: number) => {
    try {
      const response = await instance.get(`/house/${userId}`);
      return {
        ...response.data.data,
        cookieIds: response.data.data.cookieIds.sort((a, b) => a - b),
      };
    } catch (err) {
      throw new Error();
    }
  },
};
