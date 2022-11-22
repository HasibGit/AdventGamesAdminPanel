interface Description {
  culture: string;
  value: string;
}

export interface WinnerInfo {
  city: string;
  fullName: string;
  prizeDescriptions: Description[];
  prizeName: string;
  score: string;
  scoreDay: string;
  userEmail: string;
  userName: string;
}

export interface Winners {
  errors: {
    errors: string[];
  };
  isSuccess: boolean;
  result: {
    count: number;
    records: WinnerInfo[];
  };
}
