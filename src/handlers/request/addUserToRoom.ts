import { updateRoomHandler } from 'handlers/response/updateRoom';
import type { IReqAddUserToRoom } from 'models/ClientRequests';
import type { IGameInit } from 'models/Game.interface';
import { addUserToRoom } from 'services/addUserToRoom';
import createGame from 'services/createGame';
import type { WebSocket, WebSocketServer } from 'ws';
import { sockets } from 'ws_server';

export const addUserToRoomHandler = (
  _ws: WebSocket,
  reqData: IReqAddUserToRoom,
  socketId: number,
  wss: WebSocketServer,
): void => {
  if (reqData.type === 'add_user_to_room') {
    const initData: IGameInit | undefined = addUserToRoom(reqData, socketId);
    if (initData) {
      const game = createGame(initData);

      const hostResponse = JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({ idGame: game.hostId, idPlayer: game.hostId }),
        id: 0,
      });
      const clientResponse = JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({ idGame: game.hostId, idPlayer: game.clientId }),
        id: 0,
      });

      wss.clients.forEach((client) => {
        sockets.forEach((socket, key) => {
          if (game.hostId === key && socket === client) {
            client.send(hostResponse);
          }
          if (game.clientId === key && socket === client) {
            client.send(clientResponse);
          }
        });
      });
      updateRoomHandler(wss);
    }
  }
};
