import { $Enums, Match } from '@prisma/client';
import { MatchesRepositoryInterface } from '../interface/matches-repository-interface';
import { randomUUID } from 'node:crypto';

export class InMemoryMatchesRepository implements MatchesRepositoryInterface {
  public matches: Match[] = [];
  createMatch(userId: string, opponentId: string): Promise<Match> {
    const newMatch: Match = {
      id: randomUUID(),
      player1Id: userId,
      player2Id: opponentId,
      winnerId: null,
      status: $Enums.MatchStatus.PENDING,
      startedAt: null,
      endedAt: null,
    };

    return Promise.resolve(newMatch);
  }

  finishMatch(id: string): Promise<Match | null> {
    const matchIndex = this.matches.findIndex((match) => match.id === id);
    if (matchIndex === -1) return Promise.resolve(null);

    const match = this.matches[matchIndex];
    match.status = $Enums.MatchStatus.FINISHED;
    match.endedAt = new Date();

    this.matches[matchIndex] = match;
    return Promise.resolve(match);
  }

  setWinner(matchId: string, winnerId: string): Promise<Match | null> {
    const matchIndex = this.matches.findIndex((match) => match.id === matchId);
    if (matchIndex === -1) return Promise.resolve(null);

    const match = this.matches[matchIndex];
    match.winnerId = winnerId;

    this.matches[matchIndex] = match;
    return Promise.resolve(match);
  }

  getMatchById(id: string): Promise<Match | null> {
    const match = this.matches.find((match) => match.id === id);
    return Promise.resolve(match || null);
  }
  getMatchesByUserId(userId: string): Promise<Match[]> {
    const matches = this.matches.filter((match) => match.player1Id === userId || match.player2Id === userId);
    return Promise.resolve(matches);
  }
  getAllMatches(): Promise<Match[]> {
    return Promise.resolve(this.matches);
  }
  getRecentMatches(userId: string, limit: number): Promise<Match[]> {
    const matches = this.matches.filter((match) => match.player1Id === userId || match.player2Id === userId);
    return Promise.resolve(matches.slice(-limit));
  }
}
