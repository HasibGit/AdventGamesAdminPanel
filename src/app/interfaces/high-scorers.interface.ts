export interface HighScorerInfo {
  city: string;
  companyId: string;
  fullName: string;
  gameId: string;
  score: number;
  scoreDay: string;
  userEmail: string;
  userId: string;
  userName: string;
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
