import {atom, selector} from 'recoil';
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
export const loginStateAtom = selector<boolean>({
  key: 'loginStateAtom',
  get: ({get}) => {
    const userInfo = get(userInfoAtom);

    // userInfo가 default 상태인지 확인하고, 그에 따라 true 혹은 false 반환
    return JSON.stringify(userInfo) !== JSON.stringify(initialUserInfoState);
  },
});
