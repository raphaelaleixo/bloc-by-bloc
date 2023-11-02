import { Faction } from "../../utils/constants";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";
import Player from "../player";
import { PoliceOpsCard, policeOpsCardTypes, policeOpsMovimentTypes } from "./constants";
import Police from ".";

export const handlePoliceOpsCard = (card: PoliceOpsCard, policeInstance: Police, city: City, players: Player[]) => {
    if (card.type === policeOpsCardTypes.moviment) {
        if (card.moviment.movimentType === policeOpsMovimentTypes.district || policeOpsMovimentTypes.priority) {
            policeInstance.movePoliceBlocks(city, players, card.moviment.movimentType, card.moviment.target as Faction | OtherDistrictTypes);
        }
        if (card.moviment.movimentType === policeOpsMovimentTypes.occupation || card.moviment.movimentType === policeOpsMovimentTypes.bloc) {
            policeInstance.movePoliceBlocks(city, players, card.moviment.movimentType);
        }
    }

    if (card.type === policeOpsCardTypes.reinforcement) {
        const districtsWithVans = policeInstance.getDistrictsWithPoliceVans();
        districtsWithVans.forEach((district) => {
            if (policeInstance.vans.find(van => van.districtId === district).hits === 0) {
                policeInstance.createBlock(district as number);
            }
        });
    }
    if (card.type === policeOpsCardTypes.rotation) {
        const policeBlocksByDistrict = policeInstance.getPoliceBlocksByDistrict();
        const districtsWithPoliceBlocks = policeInstance.getDistrictsWithBlocks();

        districtsWithPoliceBlocks.forEach(district => {
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
