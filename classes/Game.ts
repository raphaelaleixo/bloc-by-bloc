import { instanceToInstance } from 'class-transformer';
import { GameStates } from '../utils/constants';

export default class Game {
  players: number;

  difficulty: number;

  room: string;

  state: GameStates = GameStates.Setup;

  constructor(players: number, difficulty: number, room: string) {
    this.players = players;
    this.difficulty = difficulty;
    this.room = room;
  }

  setGameSate(newGameState: GameStates): this {
    this.state = newGameState;
    return this;
  }

  clone(): this {
    return instanceToInstance(this) as this;
  }
}
