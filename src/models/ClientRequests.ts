export interface IReqRegPlayer {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: 0;
}

export interface IReqCreateRoom {
  type: 'create_room';
  data: string;
  id: 0;
}

export interface IReqAddUserToRoom {
  type: 'add_user_to_room';
  data: {
    indexRoom: number | string;
  };
  id: 0;
}

export interface IReqAddShips {
  type: 'add_ships';
  data: {
    gameId: number | string;
    ships: [
      {
        position: {
          x: number;
          y: number;
        };
        direction: boolean;
        length: number;
        type: 'small' | 'medium' | 'large' | 'huge';
      },
    ];
    indexPlayer: number | string;
  };
  id: 0;
}

export interface IReqAttack {
  type: 'attack';
  data: {
    gameId: number | string;
    x: number;
    y: number;
    indexPlayer: number | string;
  };
  id: 0;
}

export interface IReqAttackRandom {
  type: 'randomAttack';
  data: {
    gameId: number | string;
    indexPlayer: number | string;
  };
  id: 0;
}

export type TAnyReq =
  | IReqAttackRandom
  | IReqAttack
  | IReqAddShips
  | IReqAddUserToRoom
  | IReqCreateRoom
  | IReqRegPlayer;
