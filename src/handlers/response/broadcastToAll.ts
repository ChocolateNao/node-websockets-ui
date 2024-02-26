import type { WebSocketServer } from 'ws';

export const broadcastToAll = (
  server: WebSocketServer,
  response: string,
): void => {
  server.clients.forEach((client) => {
    client.send(response);
  });
  console.log(`[WS] | [broadcast] >> To: ALL`);
  console.log('Data: ', response);
};
