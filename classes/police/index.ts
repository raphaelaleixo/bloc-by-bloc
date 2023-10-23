import { Faction } from "../../utils/constants";
import City, { CityBlock } from "../city";
import { OtherDistrictTypes } from "../district/constants";

const stateDistricts = [12, 13, 14, 15];
enum policePriority {
    lower,
    higher
}

class PoliceBlock {
    districtId: string | number;

    constructor(districtId: number) {
        this.districtId = districtId;
    }

    movePolice(districtCode: string | number) {
        this.districtId = districtCode;
    }
}

const findAdjacentDistricts = (city: City, targetId: string | number) => {
    const targetDistrict = city.getDistrictCoordinates().find(coordinate => coordinate.id === targetId);
    if (!targetDistrict) {
        return [];
    }
    const { x, y } = targetDistrict;
    const adjacentTiles: CityBlock[] = [];
    //TODO: Add highway rules
    //TODO: Add barricade rules
    // Left
    if (x > 0) {
        adjacentTiles.push(city.blocks[y][x - 1]);
    }
    // Right
    if (x < 4) {
        adjacentTiles.push(city.blocks[y][x + 1]);
    }
    // Up
    if (y > 0) {
        adjacentTiles.push(city.blocks[y - 1][x]);
    }
    // Down
    if (y < 4) {
        adjacentTiles.push(city.blocks[y + 1][x]);
    }
    // You can add diagonal checks here if needed
    return adjacentTiles;
}


export default class Police {
    moraleTrack = [1, 2, 2, 2, 3];
    moraleIndex = 0;
    blocks: PoliceBlock[] = [];

    initialize() {
        stateDistricts.forEach(district => {
            this.createPoliceBlock(district);
            this.createPoliceBlock(district);
            this.createPoliceBlock(district);
        });
        return this;
    }

    getDistrictsWithPoliceBlocks(): Array<string|number> {
        return Array.from(new Set(this.blocks.map((policeBlock) => policeBlock.districtId)));
    }

    getBlocksInDistrict(districtId: number | string): PoliceBlock[] {
        return this.blocks.filter(block => block.districtId === districtId);
    }

    createPoliceBlock(districtCode: number) {
        this.blocks.push(new PoliceBlock(districtCode))
    }

    movePoliceBlocks(city: City, districtType: Faction | OtherDistrictTypes, priority?: policePriority) {
        this.getDistrictsWithPoliceBlocks().forEach(districtId => {
            const actualDistrict = districtId;
            const allAdjacentDistricts = findAdjacentDistricts(city, districtId);
            const targetDistricts = allAdjacentDistricts.find((district => district.tile.districtType === districtType));
            if (targetDistricts) {
                const targetId = targetDistricts.tile.id;
                const blocks = this.getBlocksInDistrict(actualDistrict)
                const totalBlocks = blocks.length;
                if (totalBlocks > 1) {
                    const blocksToMove = totalBlocks - 1;
                    for (let i = 0; i < blocksToMove; i++) {
                        blocks[i].movePolice(targetId);
                    }
                    console.log(`Movi ${blocksToMove} de ${actualDistrict} para ${targetId}`)
                }
            }
        })
    }

}