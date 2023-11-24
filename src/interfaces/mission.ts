import {IFurniture} from './furniture';

// 미션 내용 조회
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

// 오늘 미션 조회
export interface ITodayMission {
  missionId: number;
  missionDate: string;
  missionMessage: string;
  missionCompleteId: null | number;
}
