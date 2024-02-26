import type { IReqCreateRoom } from 'models/ClientRequests';
import { createRoom } from 'services/createRoom';
import type { WebSocket, WebSocketServer } from 'ws';

import { updateRoomHandler } from '../response/updateRoom';

export const createRoomHandler = (
  _ws: WebSocket,
  reqData: IReqCreateRoom,
  socketId: number,
  wss: WebSocketServer,
): void => {
  if (reqData.type === 'create_room') {
    createRoom(socketId);
  }
  updateRoomHandler(wss);
};
