import { WordEntryRepositoryInterface } from '../interface/word-entry-interface';
import { Prisma, WordEntry } from '@prisma/client';
import { prismaClient } from '@/models/prisma/prisma-client';

export class PrismaWordEntryRepository implements WordEntryRepositoryInterface {
  async create(data: Prisma.WordEntryCreateInput): Promise<WordEntry> {
    return prismaClient.wordEntry.create({
      data,
    });
  }

  async update(id: string, data: Prisma.WordEntryUpdateInput): Promise<WordEntry | null> {
    return prismaClient.wordEntry.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<WordEntry | null> {
    return prismaClient.wordEntry.delete({
      where: { id },
    });
  }

  async findAll(): Promise<WordEntry[]> {
    return prismaClient.wordEntry.findMany();
  }

  async findById(id: string): Promise<WordEntry | null> {
    return prismaClient.wordEntry.findUnique({
      where: { id },
    });
  }

  async findByWord(word: string): Promise<WordEntry | null> {
    return prismaClient.wordEntry.findFirst({
      where: { word },
    });
  }
  
  async findByMatchId(matchId: string): Promise<WordEntry[]> {
    return prismaClient.wordEntry.findMany({
      where: { matchId },
    });
  }
}
