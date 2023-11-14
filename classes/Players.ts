import { Type, instanceToInstance } from 'class-transformer';
import Player from './Player';
import { OccupationTypes, PlayerNumber } from '../utils/constants';

export default class Players {
  @Type(() => Player)
    listOfPlayers: Player[] = [];

  addPlayer(player: Player): this {
    this.listOfPlayers.push(player);
    return this;
  }

  private findPlayer(playerNumber: PlayerNumber): Player {
    return this.listOfPlayers.find(
      (player) => player.playerNumber === playerNumber,
    );
  }

  finishSetup(playerNumber: PlayerNumber): this {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.finishSetup();
    return this;
  }

  createBlock(playerNumber: PlayerNumber, districtId: number) {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.createBlock(districtId);
    return this;
  }

  createOccupation(playerNumber: PlayerNumber, type: OccupationTypes, districtId: number): this {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.createOccupation(type, districtId);
    return this;
  }

  rollDice(playerNumber: PlayerNumber): this {
    const targetPlayer = this.findPlayer(playerNumber);
    const targetPlayerFactionStart = targetPlayer.occupations
      .find((occupation) => occupation.type === OccupationTypes.factionStart && occupation.active);

    if (targetPlayerFactionStart) {
      targetPlayer.createBlock(targetPlayerFactionStart.districtId);
    }
    targetPlayer.rollDice();
    return this;
  }

  skipActions(playerNumber: PlayerNumber): this {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.skipActions();
    return this;
  }

  finishNightTimeStep(playerNumber: PlayerNumber): this {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.finishNightTimeStep();
    return this;
  }

  startNightTimeStep(playerNumber: PlayerNumber): this {
    const targetPlayer = this.findPlayer(playerNumber);
    targetPlayer.startNightTimeStep();
    return this;
  }

  clone(): this {
    return instanceToInstance(this) as this;
  }
}
