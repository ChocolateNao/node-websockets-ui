import { db } from 'db/mainDb';
import type { IReqAddUserToRoom } from 'models/ClientRequests';
import type { IGameInit } from 'models/Game.interface';

export const addUserToRoom = (
  reqData: IReqAddUserToRoom,
  socketId: number,
): IGameInit | undefined => {
  if (reqData.data.indexRoom !== socketId) {
    const clientRoom = db.rooms.getRoomById(socketId);
    if (clientRoom) {
      const rooms = db.rooms.getAllRooms();
      rooms.splice(rooms.indexOf(clientRoom), 1);
    }
    const hostRoom = db.rooms.getRoomById(reqData.data.indexRoom as number);
    if (hostRoom) {
      const rooms = db.rooms.getAllRooms();
      rooms.splice(rooms.indexOf(hostRoom), 1);
    }
    return { host: reqData.data.indexRoom, client: socketId, isOnline: true };
  }
};
