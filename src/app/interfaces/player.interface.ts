export interface PlayerInfo {
  user: {
    userId: string;
    userName: string;
    userEmail: string;
  };
  personalBestScore: number;
  lastGameScore: number;
  gameId: string;
  companyId: string;
  id: string;
  createdOn: string;
  modifiedOn: string;
}

export interface Player {
  errors: {
    errors: string[];
  };
  result: {
    count: number;
    records: PlayerInfo[];
  };
  isSuccess: boolean;
}
