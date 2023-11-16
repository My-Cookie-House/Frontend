import {IFurniture} from './furniture';

export interface ICompletedMission {
  missionCompleteId: number;
  missionCompleteImage: string;
  missionCompleteContent: string;
  missionCompleteDate: string;
  missionCompleteFurniture: IFurniture;
}

export interface IAllCompletedMissions {
  completedMissions: ICompletedMission[];
}
