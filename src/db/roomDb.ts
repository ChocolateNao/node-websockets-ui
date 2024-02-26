import type { IRoom } from 'models/Room.interface';
import type { IUser } from 'models/User.interface';

export class RoomDatabase {
  private readonly rooms: IRoom[];

  constructor() {
    this.rooms = [];
  }

  createRoom(roomId: number): void {
    const existingRoom = this.rooms.find((room) => room.roomId === roomId);
    if (!existingRoom) {
      this.rooms.push({
        roomId,
        roomUsers: [],
      });
    } else {
      console.error(`Room with ID ${roomId} already exists.`);
    }
  }

  deleteRoom(roomId: number): void {
    const index = this.rooms.findIndex((room) => room.roomId === roomId);
    if (index !== -1) {
      this.rooms.splice(index, 1);
    } else {
      console.error(`Room with ID ${roomId} does not exist.`);
    }
  }

  addUserToRoom(roomId: number, user: IUser): void {
    const room = this.rooms.find((room) => room.roomId === roomId);
    if (room) {
      room.roomUsers.push(user);
    } else {
      console.error(`Room with ID ${roomId} does not exist.`);
    }
  }

  removeUserFromRoom(roomId: number, userId: number): void {
    const room = this.rooms.find((room) => room.roomId === roomId);
    if (room) {
      const index = room.roomUsers.findIndex((user) => user.index === userId);
      if (index !== -1) {
        room.roomUsers.splice(index, 1);
      } else {
        console.error(`User with ID ${userId} not found in room ${roomId}.`);
      }
    } else {
      console.error(`Room with ID ${roomId} does not exist.`);
    }
  }

  getRoomById(roomId: number): IRoom | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }

  getAllRooms(): IRoom[] {
    return this.rooms;
  }
}
