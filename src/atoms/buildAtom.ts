import {atom} from 'recoil';

export type BuildStateAtom = {
  type: 'unselected' | 'random' | 'custom';
  cookieIds: (number | null)[];
  icingId: number | null;
  name: string;
};

export const initalBuildState: BuildStateAtom = {
  type: 'unselected',
  cookieIds: [null, null],
  icingId: null,
  name: '',
};

export const buildStateAtom = atom<BuildStateAtom>({
  key: 'buildState',
  default: initalBuildState,
});
