import { db } from 'db/mainDb';
import type { IResTurnInfo } from 'models/ServerResponses';
import type { WebSocket, WebSocketServer } from 'ws';
import { sockets } from 'ws_server';

export const turnHandler = (
  _ws: WebSocket,
  reqData: IResTurnInfo,
  _socketId: number,
  wss: WebSocketServer,
): void => {
  const game = db.games.getGameById(reqData.data.currentPlayer);
  const hostResponse = JSON.stringify({
    type: 'turn',
    data: JSON.stringify({
      currentPlayerIndex: game?.hostId,
    }),
    id: 0,
  });
  const clientResponse = JSON.stringify({
    type: 'start_game',
    data: JSON.stringify({
      currentPlayer: game?.clientId,
    }),
    id: 0,
  });

  wss.clients.forEach((client) => {
    sockets.forEach((socket, key) => {
      if (game?.hostId === key && socket === client) {
        client.send(hostResponse);
      }
      if (game?.clientId === key && socket === client) {
        client.send(clientResponse);
      }
    });
  });
  console.log(
    `[WS] | [${reqData.type}] >> To: ${game?.hostId} and ${game?.clientId}`,
  );
  console.log('Data: ', hostResponse, clientResponse);
};
