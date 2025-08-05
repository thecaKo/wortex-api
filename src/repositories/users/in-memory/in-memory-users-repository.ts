import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../interface/users-repository-interface";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];
  create(data: Prisma.UserCreateInput): Promise<User> {
    const users: User = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      password: data.password,
      rank: data.rank ?? 0,
      points: data.points ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(users);
    return Promise.resolve(users);
  }

  update(
    id: string,
    data: Prisma.UserUncheckedCreateInput
  ): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return Promise.resolve(null);

    const existingUser = this.users[userIndex];
    const updatedUser: User = {
      id: existingUser.id,
      username: data.username ?? existingUser.username,
      email: data.email ?? existingUser.email,
      password: data.password ?? existingUser.password,
      rank: data.rank ?? existingUser.rank,
      points: data.points ?? existingUser.points,
      createdAt: existingUser.createdAt,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return Promise.resolve(updatedUser);
  }
  delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return Promise.resolve(false);
    this.users.splice(userIndex, 1);
    return Promise.resolve(true);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user || null);
  }

  findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);
    return Promise.resolve(user || null);
  }
}
