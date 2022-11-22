export interface GenerateWinnersPayload {
  gameId: string;
  limit: number;
  filter: string;
  fromDate: string;
  toDate: string;
}
