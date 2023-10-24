import Police from ".";
import { Faction } from "../../utils/constants";
import { findAdjacentDistricts } from "../../utils/getAdjacentDistricts";
import City from "../city";
import { OtherDistrictTypes } from "../district/constants";

export const movePoliceBlocks = (city: City, districtId: number | string, districtType: Faction | OtherDistrictTypes, policeInstance: Police) => {
    const actualDistrict = districtId;
    const allAdjacentDistricts = findAdjacentDistricts(city, districtId);
    const targetDistricts = allAdjacentDistricts.find((district => district.tile.districtType === districtType));
    if (targetDistricts) {
        const targetId = targetDistricts.tile.id;
        const blocks = policeInstance.getBlocksInDistrict(actualDistrict)
        const totalBlocks = blocks.length;
        if (totalBlocks > 1) {
            const blocksToMove = totalBlocks - 1;
            for (let i = 0; i < blocksToMove; i++) {
                blocks[i].movePolice(targetId);
            }
        }
    }
}