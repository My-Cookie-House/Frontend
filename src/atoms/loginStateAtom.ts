import {atom, selector} from 'recoil';
import auth from '../apis/auth';

export type LoginState = {
  loggedIn: boolean;
  userId: number | null;
  userName: string | null;
  isHouseBuilt: boolean | null;
  todayMissionComplete: boolean | null;
};

export const initialLoginState: LoginState = {
  loggedIn: false,
  userId: null,
  userName: null,
  isHouseBuilt: null,
  todayMissionComplete: null,
};

export const loginStateAtom = atom<LoginState>({
  key: 'loginState',
  default: initialLoginState,
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
