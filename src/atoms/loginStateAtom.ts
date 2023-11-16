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
