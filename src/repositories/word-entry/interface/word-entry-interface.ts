import { Prisma, WordEntry } from '@prisma/client';

export interface WordEntryRepositoryInterface {
  create(data: Prisma.WordEntryCreateInput): Promise<WordEntry>;
  update(id: string, data: Prisma.WordEntryUpdateInput): Promise<WordEntry | null>;
  delete(id: string): Promise<WordEntry | null>;
  findAll(): Promise<WordEntry[]>;
  findById(id: string): Promise<WordEntry | null>;
  findByWord(word: string): Promise<WordEntry | null>;
  findByMatchId(matchId: string): Promise<WordEntry[]>;
}
