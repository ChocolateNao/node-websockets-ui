import { MessageType } from 'enums/MessageType';
import { addUserToRoomHandler } from 'handlers/request/addUserToRoom';
import { createRoomHandler } from 'handlers/request/createRoom';
import { regHandler } from 'handlers/request/regUser';
import type { TMessageType } from 'models/MessageType.interface';
import type { WebSocket, WebSocketServer } from 'ws';

// eslint-disable-next-line @typescript-eslint/ban-types
const commandHandlers: Record<string, Function> = {
  [MessageType.reg]: regHandler,
  [MessageType.createRoom]: createRoomHandler,
  [MessageType.addUserToRoom]: addUserToRoomHandler,
  // [MessageType.addShips]: addShipRequest,
  // [MessageType.attack]: attackRequest,
  // [MessageType.randomAttack]: randomAttackRequest,
  // [MessageType.singlePlay]: singlePlayRequest,
};

export const handleCommand = (
  type: TMessageType,
  data: unknown,
  socketId: string | number,
  ws: WebSocket,
  wss: WebSocketServer,
): void => {
  const handler = commandHandlers[type];
  if (handler) {
    handler(ws, data, socketId, wss);
    console.log(`[WS] | [${type}] >> From: ${socketId}`);
    console.log('Data: ', data);
  } else {
    console.error(`Unsupported command type: ${type}`);
  }
};
