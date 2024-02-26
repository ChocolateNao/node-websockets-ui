export interface IResUpdWinners {
  type: 'update_winners';
  data: [
    {
      name: string;
      wins: number;
    },
  ];
  id: 0;
}

export interface IResRegPlayer {
  type: 'reg';
  data: {
    name: string;
    index: number | string;
    error: boolean;
    errorText?: string;
  };
  id: 0;
}

export interface IResCreateGame {
  type: 'create_game';
  data: {
    idGame: number | string;
    idPlayer: number | string;
  };
  id: 0;
}

export interface IResUpdateRoom {
  type: 'update_room';
  data: [
    {
      roomId: number | string;
      roomUsers: [
        {
          name: string;
          index: number | string;
        },
      ];
    },
  ];
  id: 0;
}

export interface IResStartGame {
  type: 'start_game';
  data: {
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
    currentPlayerIndex: number | string;
  };
  id: 0;
}

export interface IResAttackFeedback {
  type: 'attack';
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number | string;
    status: 'miss' | 'killed' | 'shot';
  };
  id: 0;
}

export interface IResTurnInfo {
  type: 'turn';
  data: {
    currentPlayer: number | string;
  };
  id: 0;
}

export interface IResFinish {
  type: 'finish';
  data: {
    winPlayer: number | string;
  };
  id: 0;
}

export type TAnyRes =
  | IResFinish
  | IResTurnInfo
  | IResAttackFeedback
  | IResStartGame
  | IResUpdateRoom
  | IResCreateGame
  | IResRegPlayer
  | IResUpdWinners;
