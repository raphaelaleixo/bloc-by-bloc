import Police from ".";
import { Faction } from "../../utils/constants";
import { getAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";

type PoliceBlockMoviment = {
    blockId: number;
    targetDistrictId: number | string;
}

export const getPoliceBlockMoviments = (city: City, districtId: number | string, districtType: Faction | OtherDistrictTypes, policeInstance: Police) => {
    const actualDistrict = districtId;
    const allAdjacentDistricts = getAdjacentDistricts(city, districtId);
    const targetDistricts = allAdjacentDistricts.find((district => district.tile.districtType === districtType));
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