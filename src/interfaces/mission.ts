import {IFurniture} from './furniture';

export interface ICompletedMission {
  missionCompleteId: number;
  missionCompleteImage: string;
  missionCompleteContent: string;
  missionCompleteDate: string;
  missionCompleteFurnitureId: number;
}

export interface IAllCompletedMissions {
  completedMissions: ICompletedMission[];
}
