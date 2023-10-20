import { grid } from "../../gameData/cityGrid";
import { Code } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import District from "../district";
import { Type  } from "class-transformer";

class CityBlock {
    code: Code;
    
    @Type(() => District)
    tile: District;

    constructor(code: Code) {
        this.code = code;
    }
    addTile(district: District) {
        this.tile = district;
        return this;
    }
}

export default class City {
    @Type(() => CityBlock)
    blocks: CityBlock[][];

    constructor(blocks?: CityBlock[][]) {
        this.blocks = blocks || [];
    }

    createBlocks(districtList: District[]) {
        const shuffled = shuffler(districtList);
        const cityBlocks = grid.map((gridLine: Code[]) => gridLine.map((gridItem: Code) => {
            const targetIndex = shuffled.findIndex((item: District) => item.code === gridItem);
            const targetBlock = shuffled.splice(targetIndex, 1);
            return new CityBlock(gridItem).addTile(targetBlock);
        }))
        this.blocks = cityBlocks;
        return this;
    }
}