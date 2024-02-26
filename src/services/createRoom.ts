import { db } from 'db/mainDb';
import type { IUser } from 'models/User.interface';

export const createRoom = (socketId: number): void => {
  const room = db.rooms.getRoomById(socketId);
  if (!room) {
    const user = db.users.getUserById(socketId);
    const data = {
      roomId: socketId,
      roomUsers: [
        {
          name: user?.name,
          index: user?.index,
        },
      ],
    };
    db.rooms.createRoom(socketId);
    db.rooms.addUserToRoom(socketId, data.roomUsers[0] as IUser);
  }
};
