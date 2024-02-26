import type { IReqAttack } from 'models/ClientRequests';
import type { WebSocket, WebSocketServer } from 'ws';

export const attackHandler = (
  _ws: WebSocket,
  _reqData: IReqAttack,
  _socketId: number,
  _wss: WebSocketServer,
): void => {};
