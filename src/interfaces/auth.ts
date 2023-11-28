export interface ILoginUser {
  userId: number;
  userName: string;
  isHouseBuilt: boolean;
  todayMissionComplete: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  userName: string;
  isHouseBuilt: boolean;
  todayMissionComplete: boolean;
  isRegistered: boolean;
}
