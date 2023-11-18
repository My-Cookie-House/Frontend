import {atom} from 'recoil';

export type UserInfo = {
  userId: number | null;
  userName: string | null;
  isHouseBuilt: boolean | null;
  todayMissionComplete: boolean | null;
};

export type Data = {
  userId: number | null;
  refreshToken: string | null;
  accessToken: string | null;
  isRegistered: boolean | null;
  userName: string | null;
};

// 로그인 한 유저 정보
export const initialUserInfoState = {
  userId: null,
  userName: null,
  isHouseBuilt: false,
  todayMissionComplete: false,
};

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfoState,
});

// 로그인 여부
export const loginStateAtom = atom<boolean>({
  key: 'loginState',
  default: false,
});
