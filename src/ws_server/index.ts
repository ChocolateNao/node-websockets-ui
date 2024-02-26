import { updateRoomHandler } from 'handlers/response/updateRoom';
import { updateWinnersHandler } from 'handlers/response/updateWinners';
import type { WebSocket } from 'ws';
import { WebSocketServer } from 'ws';

import type { TMessageType } from '../models/MessageType.interface';
import { jsonParseDeep } from '../utils/jsonParseDeep';

import { handleCommand } from './handler';

export const sockets = new Map<number, WebSocket>();

export const wsServerStart = (port: number): void => {
  const wss = new WebSocketServer({ port }, () => {
    console.log(`[WS] | WebSocket server started on port: ${port}`);
  });

  wss.on('connection', (ws: WebSocket) => {
    const socketId = new Date().valueOf();
    sockets.set(socketId, ws);
    console.log(`[WS] | New connection. Socket ID: ${socketId}`);

    ws.on('message', (data: string) => {
      const parsedData = jsonParseDeep(data);
      handleCommand(
        parsedData?.type as TMessageType,
        parsedData,
        socketId,
        ws,
        wss,
      );
      console.log(parsedData);
    });

    ws.on('close', () => {
      console.log('[WS] | Connection was terminated');
      updateWinnersHandler(wss);
      updateRoomHandler(wss);
    });
  });

  wss.on('close', () => {
    console.log('[WSS] >> The server has been shut down');
  });
};
