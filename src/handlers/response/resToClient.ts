import type WebSocket from 'ws';

export const resToClient = (ws: WebSocket, response: string): void => {
  ws.send(response);
};
