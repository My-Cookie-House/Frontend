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
export interface RenderMissionModalContentProps {
  modalStep: number;
  missionMessage: string;
  missionId: number;
  data: ICompletedMission | null;
  uploadedImage: string | ArrayBuffer;
  contentValue: string;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckExistImageMessage: () => void;
  handleOpenShowMoreMenu: () => void;
  showChangeButton: boolean;
  onClose: () => void;
}