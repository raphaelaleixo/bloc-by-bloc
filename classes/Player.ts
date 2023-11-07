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

  constructor(playerNumber: PlayerNumber) {
    super();
    this.playerNumber = playerNumber;
    this.blockCount = 10;
  }

  addFaction(faction: Faction): this {
    this.faction = faction;
    return this;
  }

  initialize(): this {
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

  createOccupation(type: OccupationTypes, districtId: number): this {
    const targetOccupation = this.occupations
      .find((occupation) => occupation.type === type && !occupation.active);
    if (targetOccupation) {
      targetOccupation.create(districtId);
    }
    return this;
  }
}
