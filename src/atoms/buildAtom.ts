import {atom, selector} from 'recoil';

export type BuildStateAtom = {
  type: 'unselected' | 'random' | 'custom';
  cookieIds: (number | null)[];
  icingId: number | null;
  wallpaperId: number | null;
  name: string;
};

export const initalBuildState: BuildStateAtom = {
  type: 'unselected',
  cookieIds: [null, null],
  icingId: null,
  wallpaperId: null,
  name: '',
};

export const buildStateAtom = atom<BuildStateAtom>({
  key: 'buildState',
  default: initalBuildState,
});

export const sortedCookieIdsSelector = selector({
  key: 'sortedCookieIds',
  get: ({get}) => {
    const cookieIds = get(buildStateAtom).cookieIds;

    // 쿠키를 import 하기 위해 cookieIds 배열 정렬
    const [num1, num2] = [...cookieIds].sort((a, b) => a - b);

    return [num1, num2];
  },
});
