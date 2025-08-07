import { Match } from '@prisma/client';

export interface MatchesRepository {
  createMatch(userId: string, opponentId: string): Promise<Match>;
  finishMatch(matchId: string): Promise<Match | null>;
  getMatchById(id: string): Promise<Match | null>;
  getMatchesByUserId(userId: string): Promise<Match[]>;
  getAllMatches(): Promise<Match[]>;
  getRecentMatches(userId: string, limit: number): Promise<Match[]>;
  setWinner(matchId: string, winnerId: string): Promise<Match | null>;
}
