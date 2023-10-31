import { grid } from "../../gameData/cityGrid";
import { Code } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import District, { Highway } from "../district";
import { Type } from "class-transformer";

export class CityBlock {
    code: Code;

    @Type(() => District, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: District, name: 'district' },
                { value: Highway, name: 'highway' },
            ],
        },
    })
    tile: District | Highway;

    constructor(code: Code) {
        this.code = code;
    }
    addTile(tile: District | Highway) {
        this.tile = tile;
        return this;
    }
}

export type DistrictCoordinate = {
    x: number;
    y: number;
    id: number | string;
}

export default class City {
    @Type(() => CityBlock)
    blocks: CityBlock[][];

    constructor(blocks?: CityBlock[][]) {
        this.blocks = blocks || [];
    }

    getDistrictCoordinates() {
        const coordinates: DistrictCoordinate[] = [];
        let x = 0;
        let y = 0;
        this.blocks.forEach((line) => {
            line.forEach((block) => {
                coordinates.push({
                    x, y, id: block.tile.id
                });
                x++;
            });
            y++;
            x = 0;
        })

        return coordinates;
    }

    createBlocks(districtList: Array<District | Highway>) {
        const shuffled = shuffler(districtList);
        const cityBlocks = grid.map((gridLine: Code[]) => gridLine.map((gridItem: Code) => {
            const targetIndex = shuffled.findIndex((item: District) => item.code === gridItem);
            const targetBlock = shuffled.splice(targetIndex, 1);
            return new CityBlock(gridItem).addTile(targetBlock[0]);
        }))
        this.blocks = cityBlocks;
        return this;
    }

    liberateDistrict(districtId: number) {
        this.blocks.forEach((line) => {
            const targetDistrict = line.find(block => block.tile.id === districtId)?.tile;
            console.log(targetDistrict);
            if (targetDistrict && targetDistrict instanceof District) {
                targetDistrict.liberateDistrict()
            }
        });
    }
}