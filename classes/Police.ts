import { Type } from 'class-transformer';
import {
  Faction, OtherDistrictTypes, PoliceOpsCard, PoliceOpsMovimentTypes, Priority, stateDistricts,
  PoliceBlockMap,
} from '../utils/constants';
import City from './City';
import Entity from './Entity';
import Player from './Player';
import handlePoliceOpsCard from '../utils/handlePoliceOpsCard';
import getPoliceBlockMoviments from '../utils/getPoliceBlockMoviments';
import PoliceOpsDeck from './PoliceOpsDeck';
import PoliceVan from './PoliceVan';

export default class Police extends Entity {
  moraleIndex = 0;

  vanCount: number = 4;

  currentCard: PoliceOpsCard;

  @Type(() => PoliceVan)
    vans: PoliceVan[] = [];

  constructor() {
    super();
    this.blockCount = 30;
  }

  initialize() {
    stateDistricts.forEach((district) => {
      this.createBlock(district);
      this.createBlock(district);
      this.createBlock(district);
      this.createPoliceVan(district);
    });
    return this;
  }

  drawPoliceCard(deck: PoliceOpsDeck, city: City, players: Player[]) {
    const card = deck.draw();
    handlePoliceOpsCard(card, this, city, players);
    this.currentCard = card;
  }

  getPoliceBlocksByDistrict(): PoliceBlockMap {
    const blocksMap: Partial<PoliceBlockMap> = {};
    const districtsWithPoliceBlocks = this.getDistrictsWithBlocks();
    const districtsWithVans = this.getDistrictsWithPoliceVans();
    districtsWithPoliceBlocks.forEach((district) => {
      const districtObject = blocksMap[district] || {};
      blocksMap[district] = Object.assign(districtObject, {
        policeBlocks: this.blocks.filter((block) => block.districtId === district).length,
      });
    });
    districtsWithVans.forEach((district) => {
      const districtObject = blocksMap[district] || {};
      blocksMap[district] = Object.assign(districtObject, {
        policeVans: this.vans.filter((van) => van.districtId === district).length,
      });
    });
    return blocksMap;
  }

  getDistrictsWithPoliceVans(): Array<number> {
    return Array.from(new Set(this.vans.map((van) => van.districtId)));
  }

  createPoliceVan(districtCode: number) {
    if (this.vanCount > 0) {
      this.vans.push(new PoliceVan(districtCode));
      this.vanCount--;
    }
  }

  movePoliceBlocks(
    city: City,
    players: Player[],
    type: PoliceOpsMovimentTypes,
    target?: Faction | OtherDistrictTypes,
    // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
    priority?: Priority,
  ) {
    let moviments = [];
    this.getDistrictsWithBlocks().forEach((districtId) => {
      moviments = [
        ...moviments,
        ...getPoliceBlockMoviments(
          city,
          players,
          this.getBlocksInDistrict(districtId),
          type,
          districtId,
          target,
        ),
      ];
    });
    moviments.forEach((moviment) => {
      const blockToMove = this.blocks.find((block) => block.id === moviment.blockId);
      blockToMove.moveBlock(moviment.targetDistrictId);
    });
  }

  increaseMorale() {
    if (this.moraleIndex < 4) {
      this.moraleIndex++;
    }
  }

  decreaseMorale() {
    if (this.moraleIndex > 0) {
      this.moraleIndex--;
    }
  }
}