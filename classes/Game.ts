export default class Game {
  players: number;

  difficulty: number;

  room: string;

  constructor(players: number, difficulty: number, room: string) {
    this.players = players;
    this.difficulty = difficulty;
    this.room = room;
  }
}
