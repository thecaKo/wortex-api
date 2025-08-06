import { Prisma, User } from '@prisma/client';
import { prismaClient } from '@/models/prisma/prisma-client';
import { UsersRepository } from '../interface/users-repository-interface';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prismaClient.user.create({
      data,
    });
    return user;
  }

  async update(id: string, data: Prisma.UserUncheckedCreateInput): Promise<User | null> {
    const user = prismaClient.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const user = await prismaClient.user.delete({
      where: { id },
    });

    if (!user) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  async findAll(): Promise<User[]> {
    const users = await prismaClient.user.findMany();
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { username },
    });
    return user;
  }
}
