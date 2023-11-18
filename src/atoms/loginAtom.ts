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

export const DataAtom = atom<Data>({
  key: 'Data',
  default: {
    userId: null,
    refreshToken: '',
    accessToken: '',
    isRegistered: false,
    userName: '',
  },
});

export const loginMethodAtom = atom<string>({
  key: 'loginMethod',
  default: 'kakao',
});
