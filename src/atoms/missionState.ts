import {atom} from 'recoil';

// export type missionStateType = {
//   missionCompleteId: number;
//   missionCompleteImage: string;
//   missionCompleteContent: string;
//   missionCompleteDate: string;
//   missionCompleteFurnitureId: number;
// };

export const initialMissionState = {
  missionCompleteImage: '',
  missionCompleteContent: '',
  missionCompleteFurnitureId: 0,
};

export const missionStateAtom = atom({
  key: 'missionState',
  default: initialMissionState,
});
