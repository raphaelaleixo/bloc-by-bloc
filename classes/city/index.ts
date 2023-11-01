import { grid } from "../../gameData/cityGrid";
import { Code } from "../../utils/constants";
import { shuffler } from "../../utils/randomizers";
import District, { Highway } from "../district";
import { Type } from "class-transformer";
import Police from "../police";
import Player from "../player";
import { LootStatus } from "../shoppingCenter/constants";

interface ObjectsInDistrict { vans: number | null, policeBlocks: number | null, blocks: number | null, occupation: number | null, };

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

    getDistrictById(districtId:number):District {
        let district: District;
        this.blocks.forEach((line) => {
            const targetDistrict = line.find(block => block.tile.id === districtId)?.tile;
            if (targetDistrict && targetDistrict instanceof District) {
                district = targetDistrict;
            }
        });
        return district;
    }

    getObjectsInDistrict(districtId: number, { police, players, player }: { police?: Police, players?: Player[], player?: Player }): ObjectsInDistrict {
        const objects: ObjectsInDistrict = { vans: null, policeBlocks: null, blocks: null, occupation: null };
        if (police) {
            objects.vans = police.vans.filter(van => van.districtId === districtId).length;
            objects.policeBlocks = police.blocks.filter(block => block.districtId === districtId).length;
        }
        if (players) {
            let blocks = 0;
            let occupation = 0;
            players.forEach(player => {
                blocks = player.blocks.filter(block => block.districtId === districtId).length + blocks;
                occupation = player.occupations.filter(occupation => occupation.districtId === districtId && occupation.active).length + occupation;
            })
            objects.blocks = blocks;
            objects.occupation = occupation;
        } else if (player) {
            objects.blocks = player.blocks.filter(block => block.districtId === districtId).length;
            objects.occupation = player.occupations.filter(occupation => occupation.districtId === districtId && occupation.active).length;
        }
        return objects;
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
        const targetDistrict = this.getDistrictById(districtId);
        targetDistrict.liberateDistrict();
        targetDistrict.shoppingCenters.forEach(shopping => {
            shopping.graffiti();
        })
    }

    lootAction(districtId: number, loot: LootStatus) {
        const targetDistrict = this.getDistrictById(districtId);
        targetDistrict.lootShopping(loot);
    }
}