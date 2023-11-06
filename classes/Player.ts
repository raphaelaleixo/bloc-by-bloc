import { Type } from 'class-transformer';
import {
  Faction, OccupationTypes, availableOccupations, PlayerNumber, BlockMap,
} from '../utils/constants';
import Entity from './Entity';
import Occupation from './Occupation';

export default class Player extends Entity {
  playerNumber: PlayerNumber;

  faction: Faction;

  @Type(() => Occupation)
    occupations: Occupation[] = [];

  constructor(playerNumber: PlayerNumber, faction: Faction) {
    super();
    this.playerNumber = playerNumber;
    this.faction = faction;
    this.blockCount = 10;
  }

  initialize() {
    availableOccupations.forEach((occupation) => {
      this.occupations.push(new Occupation(occupation));
    });
    return this;
  }

  getDistrictsWithBlocks(): Array<number> {
    return Array.from(new Set(this.blocks.map((block) => block.districtId)));
  }

  getBlocksByDistrict(): BlockMap {
    const blocksMap: Partial<BlockMap> = {};
    const districtsWithPoliceBlocks = this.getDistrictsWithBlocks();
    districtsWithPoliceBlocks.forEach((district) => {
      const districtObject = blocksMap[district] || {};
      blocksMap[district] = Object.assign(districtObject, {
        blocks: this.blocks.filter((block) => block.districtId === district).length,
      });
    });
    return blocksMap;
  }

  createOccupation(type: OccupationTypes, districtId: number) {
    const targetOccupation = this.occupations
      .find((occupation) => occupation.type === type && !occupation.active);
    if (targetOccupation) {
      targetOccupation.create(districtId);
    }
    return this;
  }
}
