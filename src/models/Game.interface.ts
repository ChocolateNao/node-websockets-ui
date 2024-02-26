import type { IShip } from './Ship.interface';

export interface IGameInit {
  host: number;
  client: number;
  isOnline: boolean;
}

type TInternalGameData =
  | Array<{
      indexPlayer: number;
      ships: IShip[];
      grid: number[][];
    }>
  | [];

export interface IGame {
  gameId: number;
  hostId: number;
  clientId: number;
  data: TInternalGameData;
  turn?: number;
  isOnline: boolean;
}
