import { db } from 'db/mainDb';
import type { WebSocketServer } from 'ws';

import { broadcastToAll } from './broadcastToAll';

export const updateWinnersHandler = (server: WebSocketServer): void => {
  broadcastToAll(
    server,
    JSON.stringify({
      type: 'update_winners',
      data: JSON.stringify(db.users.getAllUsers()),
      id: 0,
    }),
  );
};
