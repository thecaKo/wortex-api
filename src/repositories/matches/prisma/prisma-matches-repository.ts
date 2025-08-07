import { $Enums, Match } from '@prisma/client';
import { MatchesRepositoryInterface } from '../interface/matches-repository-interface';
import { prismaClient } from '@/models/prisma/prisma-client';

export class PrismaMatchesRepository implements MatchesRepositoryInterface {
  async createMatch(userId: string, opponentId: string): Promise<Match> {
    const newMatch = await prismaClient.match.create({
      data: {
        player1Id: userId,
        player2Id: opponentId,
        status: $Enums.MatchStatus.PENDING,
      },
    });

    return newMatch;
  }

  async finishMatch(matchId: string): Promise<Match | null> {
    const match = await prismaClient.match.update({
      where: { id: matchId },
      data: {
        status: $Enums.MatchStatus.FINISHED,
        endedAt: new Date(),
      },
    });

    if (!match) return null;

    return match;
  }
  async getMatchById(id: string): Promise<Match | null> {
    const match = await prismaClient.match.findUnique({
      where: { id },
    });
    return match || null;
  }
  async getMatchesByUserId(userId: string): Promise<Match[]> {
    const matches = await prismaClient.match.findMany({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
    });

    return matches;
  }
  async getAllMatches(): Promise<Match[]> {
    const matches = await prismaClient.match.findMany();
    return matches;
  }
  async getRecentMatches(userId: string, limit: number): Promise<Match[]> {
    const matches = await prismaClient.match.findMany({
      where: {
        OR: [{ player1Id: userId }, { player2Id: userId }],
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
    return matches;
  }
  async setWinner(matchId: string, winnerId: string): Promise<Match | null> {
    const match = await prismaClient.match.update({
      where: { id: matchId },
      data: { winnerId },
    });

    if (!match) return null;

    return match;
  }
}
