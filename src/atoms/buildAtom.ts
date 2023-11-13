import {atom} from 'recoil';

export type BuildStateAtom = {
  type: 'unselected' | 'random' | 'custom';
  cookieId: number[] | null;
  icingId: number | null;
};

export const buildStateAtom = atom<BuildStateAtom>({
  key: 'buildState',
  default: {
    type: 'random',
    cookieId: null,
    icingId: null,
  },
});
