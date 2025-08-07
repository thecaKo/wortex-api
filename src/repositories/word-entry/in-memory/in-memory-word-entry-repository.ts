import { Prisma, WordEntry } from '@prisma/client';
import { WordEntryRepositoryInterface } from '../interface/word-entry-interface';
import { randomUUID } from 'crypto';

export class InMemoryWordEntryRepository implements WordEntryRepositoryInterface {
  public wordEntries: WordEntry[] = [];

  async create(data: Prisma.WordEntryCreateInput): Promise<WordEntry> {
    const wordEntry: WordEntry = {
      id: randomUUID(),
      matchId: typeof data.match === 'string' ? data.match : data.match.connect?.id || '',
      userId: typeof data.user === 'string' ? data.user : data.user.connect?.id || '',
      word: data.word,
      valid: data.valid ?? false,
      timestamp: new Date(),
    };

    this.wordEntries.push(wordEntry);
    return wordEntry;
  }

  async update(id: string, data: Prisma.WordEntryUpdateInput): Promise<WordEntry | null> {
    const wordEntry = this.wordEntries.find((wordEntry) => wordEntry.id === id);
    if (!wordEntry) return null;

    const updatedWordEntry: WordEntry = {
      id: wordEntry.id,
      matchId: wordEntry.matchId,
      userId: wordEntry.userId,
      word: typeof data.word === 'string' ? data.word : data.word?.set || wordEntry.word,
      valid: typeof data.valid === 'boolean' ? data.valid : (data.valid?.set ?? wordEntry.valid),
      timestamp: wordEntry.timestamp,
    };

    this.wordEntries = this.wordEntries.map((wordEntry) => (wordEntry.id === id ? updatedWordEntry : wordEntry));
    return updatedWordEntry;
  }

  async delete(id: string): Promise<WordEntry | null> {
    const wordEntry = this.wordEntries.find((wordEntry) => wordEntry.id === id);
    if (!wordEntry) return null;

    this.wordEntries = this.wordEntries.filter((wordEntry) => wordEntry.id !== id);
    return wordEntry;
  }

  async findAll(): Promise<WordEntry[]> {
    return this.wordEntries;
  }

  async findById(id: string): Promise<WordEntry | null> {
    return this.wordEntries.find((wordEntry) => wordEntry.id === id) || null;
  }

  async findByWord(word: string): Promise<WordEntry | null> {
    return this.wordEntries.find((wordEntry) => wordEntry.word === word) || null;
  }

  async findByMatchId(matchId: string): Promise<WordEntry[]> {
    return this.wordEntries.filter((wordEntry) => wordEntry.matchId === matchId);
  }
}
