import { atom } from 'recoil';

export const missionIdAtom = atom({
  key: 'missionIdAtom',
  default: 0, // 초기값 설정
});

export const furnitureNumAtom = atom({
  key: 'furnitureNumAtom',
  default: 0, // 초기값 설정
});

export const furnitureButtonClickedAtom = atom({
    key: 'furnitureButtonClickedAtom',
    default: false, // 초기값 설정
  });
