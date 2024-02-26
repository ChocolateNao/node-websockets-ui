import { db } from 'db/mainDb';
import { broadcastToAll } from 'handlers/response/broadcastToAll';
import type { WebSocketServer } from 'ws';

export const updateRoomHandler = (wss: WebSocketServer): void => {
  broadcastToAll(
    wss,
    JSON.stringify({
      type: 'update_room',
      data: JSON.stringify(db.rooms.getAllRooms()),
      id: 0,
    }),
  );
};
