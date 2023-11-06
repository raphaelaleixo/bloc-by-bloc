import {
  Faction,
  OtherDistrictTypes,
  PoliceOpsCard,
  PoliceOpsCardTypes,
  PoliceOpsMovimentTypes,
} from './constants';
import City from '../classes/City';
import Player from '../classes/Player';
// eslint-disable-next-line import/no-cycle
import Police from '../classes/Police';

const handlePoliceOpsCard = (
  card: PoliceOpsCard,
  policeInstance: Police,
  city: City,
  players: Player[],
) => {
  if (card.type === PoliceOpsCardTypes.moviment) {
    if (
      card.moviment.movimentType === PoliceOpsMovimentTypes.district
      || PoliceOpsMovimentTypes.priority
    ) {
      policeInstance.movePoliceBlocks(
        city,
        players,
        card.moviment.movimentType,
        card.moviment.target as Faction | OtherDistrictTypes,
      );
    }
    if (
      card.moviment.movimentType === PoliceOpsMovimentTypes.occupation
      || card.moviment.movimentType === PoliceOpsMovimentTypes.bloc
    ) {
      policeInstance.movePoliceBlocks(
        city,
        players,
        card.moviment.movimentType,
      );
    }
  }

  if (card.type === PoliceOpsCardTypes.reinforcement) {
    const districtsWithVans = policeInstance.getDistrictsWithPoliceVans();
    districtsWithVans.forEach((district) => {
      if (
        policeInstance.vans.find((van) => van.districtId === district).hits
        === 0
      ) {
        policeInstance.createBlock(district as number);
      }
    });
  }
  if (card.type === PoliceOpsCardTypes.rotation) {
    const policeBlocksByDistrict = policeInstance.getPoliceBlocksByDistrict();
    const districtsWithPoliceBlocks = policeInstance.getDistrictsWithBlocks();

    districtsWithPoliceBlocks.forEach((district) => {
      const maximum = policeBlocksByDistrict[district].policeBlocks;
      if (policeBlocksByDistrict[district].policeBlocks > 5) {
        const targetBlocks = policeInstance.getBlocksInDistrict(district);
        for (let i = maximum; i > 5; i--) {
          policeInstance.removeBlock(targetBlocks[i - 1].id);
        }
      }
    });
  }

  if (card.increaseMorale) {
    policeInstance.increaseMorale();
  }
};

export default handlePoliceOpsCard;
