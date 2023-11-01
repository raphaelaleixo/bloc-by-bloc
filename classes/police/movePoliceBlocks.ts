import Police from ".";
import { Faction } from "../../utils/constants";
import { getAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City, { CityBlock } from "../city";
import { OtherDistrictTypes } from "../district/constants";
import Player from "../player";
import { policeOpsMovimentTypes } from "./constants";

type PoliceBlockMoviment = {
    blockId: number;
    targetDistrictId: number;
}

export const getPoliceBlockMoviments = (city: City, players: Player[], policeInstance: Police, movimentType: policeOpsMovimentTypes, districtId: number, target?: Faction | OtherDistrictTypes) => {
    const allAdjacentDistricts = getAdjacentDistricts(city, districtId);
    const districtsWithOccupations = policeInstance.getDistrictsWithOccupations(players);
    const districtsWithBlocks = policeInstance.getDistrictsWithBlocks(players);

    let targetDistricts: CityBlock | undefined;

    if (movimentType === policeOpsMovimentTypes.district) {
        targetDistricts = allAdjacentDistricts.find((district => district.tile.districtType === target));
    } else if (movimentType === policeOpsMovimentTypes.occupation) {
        targetDistricts = allAdjacentDistricts.find((district => districtsWithOccupations.includes(district.tile.id)));
    } else if (movimentType === policeOpsMovimentTypes.bloc) {
        targetDistricts = allAdjacentDistricts.find((district => districtsWithBlocks.includes(district.tile.id)));
    } else if (movimentType === policeOpsMovimentTypes.priority) {
        targetDistricts = allAdjacentDistricts.reduce((prev, current) => (prev && prev.tile.id > current.tile.id) ? prev : current);
    }

    const moviments: PoliceBlockMoviment[] = [];

    if (targetDistricts) {
        const targetId = targetDistricts.tile.id;
        const blocks = policeInstance.getBlocksInDistrict(districtId);
        const totalBlocks = blocks.length;
        if (totalBlocks > 1 && districtsWithOccupations.includes(districtId) === false) {
            const blocksToMove = totalBlocks - 1;
            for (let i = 0; i < blocksToMove; i++) {
                moviments.push({
                    blockId: blocks[i].id,
                    targetDistrictId: targetId,
                })
            }
        }
    }

    return moviments;
}