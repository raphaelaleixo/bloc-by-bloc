import Player from '../classes/Player';
import Occupation from '../classes/Occupation';
import Police from '../classes/Police';
import PoliceVan from '../classes/PoliceVan';
import { Block } from './constants';

interface ObjectsInDistrict {
  vans: PoliceVan[] |
  null, policeBlocks: Block[] |
  null, blocks: Block[] |
  null, occupations: Occupation[] |
  null,
}

export interface ObjectsMap {
  [key: string | number]: ObjectsInDistrict
}

export function getObjectsInDistrict(
  districtId: number,
  { police, players, player }: { police?: Police, players?: Player[], player?: Player },
): ObjectsInDistrict {
  const objects: ObjectsInDistrict = {
    vans: null, policeBlocks: null, blocks: null, occupations: null,
  };
  if (police) {
    objects.vans = police.vans.filter((van) => van.districtId === districtId);
    objects.policeBlocks = police.blocks.filter((block) => block.districtId === districtId);
  }
  if (players) {
    let blocks = [];
    let occupations = [];
    players.forEach((playerInLoop) => {
      blocks = [
        ...blocks,
        ...playerInLoop.blocks.filter((block) => block.districtId === districtId),
      ];
      occupations = [
        ...occupations,
        ...playerInLoop.occupations
          .filter((occupation) => occupation.districtId === districtId && occupation.active),
      ];
    });
    objects.blocks = blocks;
    objects.occupations = occupations;
  } else if (player) {
    objects.blocks = player.blocks.filter((block) => block.districtId === districtId);
    objects.occupations = player.occupations
      .filter((occupation) => occupation.districtId === districtId && occupation.active);
  }
  return objects;
}
