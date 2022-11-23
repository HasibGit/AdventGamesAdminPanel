export interface GenerateHighScorersPayload {
  gameId: string;
  limit: number;
  filter: string;
  fromDate: string;
  toDate: string;
}
