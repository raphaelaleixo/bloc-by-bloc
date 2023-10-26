import Police from ".";
import { Faction } from "../../utils/constants";
import { getAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City, { CityBlock } from "../city";
import { OtherDistrictTypes } from "../district/constants";
import { policeOpsMovimentTypes } from "./constants";

type PoliceBlockMoviment = {
    blockId: number;
    targetDistrictId: number | string;
}

export const getPoliceBlockMoviments = (city: City, policeInstance: Police, movimentType: policeOpsMovimentTypes, districtId: number | string, districtType?: Faction | OtherDistrictTypes) => {
    const actualDistrict = districtId;
    const allAdjacentDistricts = getAdjacentDistricts(city, districtId);
    let targetDistricts: CityBlock;
    if (movimentType === policeOpsMovimentTypes.district) {
        targetDistricts = allAdjacentDistricts.find((district => district.tile.districtType === districtType));
    } else if (movimentType === policeOpsMovimentTypes.priority) {
        targetDistricts = allAdjacentDistricts.reduce((prev, current) => (prev && prev.tile.id > current.tile.id) ? prev : current);
    }
    const moviments: PoliceBlockMoviment[] = [];
    if (targetDistricts) {
        const targetId = targetDistricts.tile.id;
        const blocks = policeInstance.getBlocksInDistrict(actualDistrict);
        const totalBlocks = blocks.length;
        if (totalBlocks > 1) {
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