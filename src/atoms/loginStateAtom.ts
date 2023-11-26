import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

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
export const initialUserInfoState: UserInfo = {
  userId: null,
  userName: null,
  isHouseBuilt: false,
  todayMissionComplete: false,
};

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfoState,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 여부
export const loginStateAtom = atom<boolean>({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
