import { Type, instanceToInstance } from 'class-transformer';
import Player from './Player';

export default class Players {
  @Type(() => Player)
    listOfPlayers: Player[] = [];

  addPlayer(player: Player): void {
    this.listOfPlayers.push(player);
  }

  clone(): this {
    return instanceToInstance(this) as this;
  }
}
