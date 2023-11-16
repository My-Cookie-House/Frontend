import {atom} from 'recoil';

export type UserInfo = {
  code: number | null;
  message: string | unknown;
  data: {
    userId: number | null;
    refreshToken: string | null;
    accessToken: string | null;
    isRegistered: boolean | null;
    userName: string | null;
    isHouseBuilt: boolean | null;
    todayMissionComplete: boolean | null;
  };
};

export const userStateAtom = atom<UserInfo>({
  key: 'userState', // 고유한 ID (전역적으로 유일해야 함)
  default: {
    code: null,
    message: null,
    data: {
      userId: null,
      refreshToken: null,
      accessToken: null,
      isRegistered: false,
      userName: null,
      isHouseBuilt: false,
      todayMissionComplete: false,
    },
  },
});

export const loginStateAtom = atom<boolean>({
  key: 'loginState',
  default: false,
});

// export const loginStateAtom = selector<LoginState>({
//   key: 'loginState',
//   get: async () => {
//     try {
//       const data = await auth.getLoginUserInfo();
//       return {loggedIn: true, ...data};
//     } catch (err) {
//       return initialLoginState; // 로그인 안된 상태
//     }
//   },
// });
