import {
  PoliceBlockMoviment, Faction, OtherDistrictTypes, PoliceOpsMovimentTypes, Block,
} from './constants';
import getAdjacentDistricts from './getAdjacentDistricts';
import City from '../classes/City';
import CityBlock from '../classes/CityBlock';
import Players from '../classes/Players';

function getDistrictsWithOccupations(players: Players) {
  const districts = [];
  players.listOfPlayers.forEach((player) => {
    player.occupations.forEach((occupation) => {
      if (occupation.active && districts.includes(occupation.districtId) === false) {
        districts.push(occupation.districtId);
      }
    });
  });
  return districts;
}

function getDistrictsWithPlayerBlocks(players: Players) {
  const districts = [];
  players.listOfPlayers.forEach((player) => {
    player.blocks.forEach((block) => {
      if (districts.includes(block.districtId) === false) {
        districts.push(block.districtId);
      }
    });
  });
  return districts;
}

const getPoliceBlockMoviments = (
  city: City,
  players: Players,
  blocksInDistrict: Block[],
  movimentType: PoliceOpsMovimentTypes,
  districtId: number,
  target?: Faction | OtherDistrictTypes,
) => {
  const allAdjacentDistricts = getAdjacentDistricts(city, districtId);
  const districtsWithOccupations = getDistrictsWithOccupations(players);
  const districtsWithBlocks = getDistrictsWithPlayerBlocks(players);

  let targetDistricts: CityBlock | undefined;

  if (movimentType === PoliceOpsMovimentTypes.district) {
    targetDistricts = allAdjacentDistricts
      .find(((district) => district.tile.districtType === target));
  } else if (movimentType === PoliceOpsMovimentTypes.occupation) {
    targetDistricts = allAdjacentDistricts
      .find(((district) => districtsWithOccupations.includes(district.tile.id)));
  } else if (movimentType === PoliceOpsMovimentTypes.bloc) {
    targetDistricts = allAdjacentDistricts
      .find(((district) => districtsWithBlocks.includes(district.tile.id)));
  } else if (movimentType === PoliceOpsMovimentTypes.priority) {
    targetDistricts = allAdjacentDistricts
      .reduce((prev, current) => ((prev && prev.tile.id > current.tile.id) ? prev : current));
  }

  const moviments: PoliceBlockMoviment[] = [];

  if (targetDistricts) {
    const targetId = targetDistricts.tile.id;
    const blocks = blocksInDistrict;
    const totalBlocks = blocks.length;
    if (totalBlocks > 1 && districtsWithOccupations.includes(districtId) === false) {
      const blocksToMove = totalBlocks - 1;
      for (let i = 0; i < blocksToMove; i++) {
        moviments.push({
          blockId: blocks[i].id,
          targetDistrictId: targetId,
        });
      }
    }
  }

  return moviments;
};

export default getPoliceBlockMoviments;
