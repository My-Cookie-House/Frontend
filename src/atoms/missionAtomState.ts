import { atom } from 'recoil';

export const missionIdAtom = atom({
  key: 'missionIdAtom',
  default: 1, // 초기값 설정
});

export const furnitureNumAtom = atom({
  key: 'furnitureNumAtom',
  default: 1, // 초기값 설정
});
