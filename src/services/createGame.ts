import { db } from 'db/mainDb';
import type { IGame, IGameInit } from 'models/Game.interface';

const createGame = (data: IGameInit): IGame => {
  const newGame = {
    gameId: data.host,
    hostId: data.host,
    clientId: data.client,
    data: [],
    isOnline: data.isOnline,
  };
  db.games.addGame(newGame);
  return newGame;
};

export default createGame;
