import type { IUser } from './User.interface';

export interface IRoom {
  roomId: number;
  roomUsers: IUser[];
}
