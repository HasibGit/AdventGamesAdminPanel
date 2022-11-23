export interface HighScorerInfo {
  user: {
    userId: string;
    userName: string;
    userEmail: string;
  };
  score: number;
  gameId: string;
  companyId: string;
  scoreDay: string;
  id: string;
  createdOn: string;
  modifiedOn: string;
}

export interface HighScorers {
  errors: {
    errors: string[];
  };

  result: {
    count: number;
    records: HighScorerInfo[];
  };

  isSuccess: boolean;
}
