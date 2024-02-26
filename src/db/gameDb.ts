import { type IGame } from 'models/Game.interface';

export class GameDatabase {
  private readonly games: IGame[];

  constructor() {
    this.games = [];
  }

  getAllGames(): IGame[] {
    return this.games;
  }

  addGame(game: IGame): void {
    this.games.push(game);
  }

  deleteGame(gameId: number): void {
    const index = this.games.findIndex((game) => game.gameId === gameId);
    if (index !== -1) {
      this.games.splice(index, 1);
    }
  }

  updateGame(gameId: number, updatedGame: Partial<IGame>): void {
    const game = this.games.find((game) => game.gameId === gameId);
    if (game) {
      Object.assign(game, updatedGame);
    }
  }

  getGameById(gameId: number | string): IGame | undefined {
    return this.games.filter((game) => game.gameId === gameId)[0];
  }
}
