import {atom} from 'recoil';

export type BuildState = {
  type: 'unselected' | 'random' | 'custom';
  cookieId: number[] | null;
  icingId: number | null;
};

const buildState = atom({
  key: 'buildState',
  default: {
    type: 'random',
    cookieId: null,
    icingId: null,
  },
});
