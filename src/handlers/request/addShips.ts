import type { IReqAddShips } from 'models/ClientRequests';
import type { WebSocket, WebSocketServer } from 'ws';
import { sockets } from 'ws_server';

import { db } from '../../db/mainDb';

export const addShipsHandler = (
  _ws: WebSocket,
  reqData: IReqAddShips,
  _socketId: number,
  wss: WebSocketServer,
): void => {
  const game = db.games.getGameById(reqData.data.gameId);
  const hostResponse = JSON.stringify({
    type: 'start_game',
    data: JSON.stringify({
      ships: game?.data.filter((user) => user.indexPlayer === game?.hostId)[0]
        ?.ships,
      currentPlayerIndex: game?.hostId,
    }),
    id: 0,
  });
  const clientResponse = JSON.stringify({
    type: 'start_game',
    data: JSON.stringify({
      ships: game?.data.filter((user) => user.indexPlayer === game?.clientId)[0]
        ?.ships,
      currentPlayerIndex: game?.clientId,
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
