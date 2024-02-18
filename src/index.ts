import { WebSocketServer } from 'ws';

import { httpServer } from './http_server/index';

const HTTP_PORT = 8181;

console.log(`Start static HTTP server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 3000;

export const wss = new WebSocketServer({ port: WS_PORT }, () => {
  console.log('WebSocket server started on port', WS_PORT);
});

wss.on('connection', (wsc: WebSocket) => {
  console.log(wsc);
});
