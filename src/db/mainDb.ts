// import type { GameDatabase } from './gameDb';
import { RoomDatabase } from './roomDb';
import { UserDatabase } from './userDb';

export class Database {
  users: UserDatabase;
  rooms: RoomDatabase;
  // games: GameDatabase;

  constructor(
    userDb: UserDatabase,
    roomDb: RoomDatabase,
    // gameDb: GameDatabase,
  ) {
    this.users = userDb;
    this.rooms = roomDb;
    // this.games = gameDb;
  }
}

const userDb = new UserDatabase();
const roomDb = new RoomDatabase();

export const db = new Database(userDb, roomDb);
