import {atom} from 'recoil';

export type UserInfo = Omit<Data, 'code' | 'message'>;

type Data = {
  userId: number | null;
  refreshToken: string | null;
  accessToken: string | null;
  isRegistered: boolean | null;
  userName: string | null;
  isHouseBuilt: boolean | null;
  todayMissionComplete: boolean | null;
};

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: {
    userId: null,
    refreshToken: null,
    accessToken: null,
    isRegistered: false,
    userName: null,
    isHouseBuilt: false,
    todayMissionComplete: false,
  },
});

export const loginStateAtom = atom<boolean>({
  key: 'loginState',
  default: false,
});

export const loginMethodAtom = atom<string>({
  key: 'loginMethod',
  default: 'kakao',
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
