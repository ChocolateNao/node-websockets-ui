import { updateRoomHandler } from 'handlers/response/updateRoom';
import { updateWinnersHandler } from 'handlers/response/updateWinners';
import type { WebSocket, WebSocketServer } from 'ws';

import type { IReqRegPlayer } from '../../models/ClientRequests';
import { registerUser } from '../../services/userRegistration';
import { resToClient } from '../response/resToClient';

export const regHandler = (
  ws: WebSocket,
  reqData: IReqRegPlayer,
  socketId: number,
  wss: WebSocketServer,
): void => {
  if (reqData.type === 'reg') {
    const response = registerUser(reqData, socketId);
    console.log(response);
    resToClient(ws, JSON.stringify(response));

    updateRoomHandler(wss);
    updateWinnersHandler(wss);
  }
};
