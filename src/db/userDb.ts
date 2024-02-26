import type { IUser } from 'models/User.interface';

export class UserDatabase {
  private readonly users: IUser[];

  constructor() {
    this.users = [];
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }

  updateIndex(oldIndex: string | number, newIndex: string | number): void {
    const user = this.users.find((user) => user.index === oldIndex);
    if (user && oldIndex !== newIndex) {
      user.index = newIndex;
    } else {
      console.error(
        `User with index '${oldIndex}' not found or it didn't change.`,
      );
    }
  }

  incrementWins(name: string): void {
    const user = this.users.find((user) => user.name === name);
    if (user) {
      user.wins++;
    } else {
      console.error(`User '${name}' not found.`);
    }
  }

  getUserByName(name: string): IUser | undefined {
    return this.users.find((user) => user.name === name);
  }

  getUserById(userId: number): IUser | undefined {
    return this.users.find((user) => user.index === userId);
  }

  getAllUsers(): IUser[] {
    return this.users;
  }
}
