// 아래는 모킹 함수

import {initialLoginState} from '../atoms/loginStateAtom';

// TODO: 실제 api로 함수 바꿔야 함
export default {
  getLoginUserInfo: async () => {
    try {
      const response: any = await new Promise((res, rej) => {
        res({
          code: 200,
          message: '유저 조회에 성공했습니다.',
          data: {
            userId: 1,
            userName: '황태환',
            isHouseBuilt: true,
            todayMissionComplete: false,
          },
        });
        // rej(new Error());
      });
      return {loggedIn: true, ...response.data};
    } catch (err) {
      return initialLoginState;
    }
  },
};
