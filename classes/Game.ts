import { instanceToInstance } from 'class-transformer';
import { Faction, GameStates } from '../utils/constants';
import { shuffler } from '../utils/randomizers';

export default class Game {
  players: Faction[] = [];

  difficulty: number;

  room: string;

  state: GameStates = GameStates.Setup;

  constructor(players: Faction[], difficulty: number, room: string) {
    this.players = players;
    this.difficulty = difficulty;
    this.room = room;
    this.players = shuffler(this.players || []);
  }

  setGameSate(newGameState: GameStates): this {
    this.state = newGameState;
    return this;
  }

  movePlayerOrder(): this {
    this.players.push(this.players.shift());
    return this;
  }

  clone(): this {
    return instanceToInstance(this) as this;
  }
}
