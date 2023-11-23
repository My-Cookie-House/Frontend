import {IFurniture} from './furniture';

export interface ICompletedMission {
  missionMessage: string;
  missionCompleteId: number;
  missionCompleteImage: string;
  missionCompleteContent: string;
  missionCompleteDate: string;
  missionCompleteFurnitureId: number;
}

export interface IAllCompletedMissions {
  completedMissions: ICompletedMission[];
  wallpaperId: number;
}
